const webpack = require('webpack');
const path = require('path');
const fs = require('node:fs');
const {
  extractVersionFromContext,
  isVersionedArchiveContext,
  resolveVersionedHdsImportToAbsolute,
} = require('./scripts/versioned-hds-resolve.cjs');
const buildSingleVersion = process.env.BUILD_SINGLE_VERSION === 'true';

/** Absolute-path aliases for hds-core-X.Y.Z / hds-react-X.Y.Z under site/node_modules. */
function getVersionedHdsPackageAliases(siteDir) {
  const aliases = {};
  const nodeModulesDir = path.join(siteDir, 'node_modules');
  if (!fs.existsSync(nodeModulesDir)) {
    return aliases;
  }
  for (const entry of fs.readdirSync(nodeModulesDir)) {
    if (!/^hds-(core|react)-\d+\.\d+\.\d+$/.test(entry)) {
      continue;
    }
    const packagePath = path.join(nodeModulesDir, entry);
    if (fs.existsSync(packagePath)) {
      aliases[entry] = packagePath;
    }
  }
  return aliases;
}

// Copy hds-core fonts.css to static so it is available at /fonts/fonts.css in the build
exports.onPreBootstrap = () => {
  const targetDir = path.join(__dirname, 'static/fonts');
  const targetPath = path.join(targetDir, 'fonts.css');
  const from = path.join(__dirname, '../packages/core/lib/fonts/fonts.css');
  if (fs.existsSync(from)) {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(from, targetPath);
  } else {
    console.error(`[Gatsby] hds-core fonts.css not found at ${from}. Run "pnpm build" in packages/core first.`);
    process.exit(1);
  }
};

// Ensure versions is always in GraphQL schema
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata implements Node {
      versions: [String!]!
      askemApiKey: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  // Custom resolver plugin to handle dynamic aliases for CSS imports
  // This hooks into webpack's resolver to catch all module resolutions including CSS
  class DynamicAliasResolverPlugin {
    apply(resolver) {
      // Hook into 'resolve' hook and run it with high priority (early in the chain)
      resolver.hooks.resolve.tapAsync({
        name: 'DynamicAliasResolverPlugin',
        stage: 1, // Run early, before AliasPlugin (which runs at stage 10)
      }, (request, resolveContext, callback) => {
        // Get context path - try multiple possible locations
        const contextPath = request.context?.path ||
          request.path ||
          (resolveContext && resolveContext.issuer) ||
          '';

        // Normalize path separators to handle Windows and POSIX paths uniformly
        const normalizedContextPath = contextPath.split(path.sep).join('/');

        // Check if resolution is coming from a versioned package directory
        // e.g., node_modules/hds-react-2.17.1 or node_modules/hds-core-3.12.1
        const versionedPackageMatch = normalizedContextPath.match(/node_modules\/(hds-(core|react)-\d+\.\d+\.\d+)/);

        // Nested deps (e.g. downshift under hds-react-4.x) must resolve from their own
        // node_modules (including pnpm .pnpm layouts). Redirecting to the versioned package
        // root node_modules breaks transitive imports like compute-scroll-into-view.
        const isNestedVersionedDependency =
          versionedPackageMatch &&
          normalizedContextPath.includes(
            `node_modules/${versionedPackageMatch[1]}/node_modules/`,
          );

        // If resolving from a versioned package, handle dependency resolution with fallback
        // Try versioned package's node_modules first, then fall back to main site's node_modules
        if (
          versionedPackageMatch &&
          !isNestedVersionedDependency &&
          request.request &&
          !request.request.startsWith('.') &&
          !request.request.startsWith('/')
        ) {
          // This is a dependency import (not a relative or absolute path)
          const versionedPackageName = versionedPackageMatch[1];
          const versionedPackagePath = path.resolve(__dirname, 'node_modules', versionedPackageName);
          const versionedNodeModules = path.join(versionedPackagePath, 'node_modules');
          const mainSiteNodeModules = path.resolve(__dirname, 'node_modules');

          // First try to resolve from versioned package's node_modules
          const tryVersionedPackage = () => {
            if (fs.existsSync(versionedNodeModules)) {
              const newRequest = {
                ...request,
                context: {
                  ...request.context,
                  path: versionedNodeModules,
                },
                path: versionedNodeModules,
              };
              return resolver.doResolve(resolver.hooks.resolve, newRequest, null, resolveContext, (err, result) => {
                // If resolution failed or no result, fall back to main site's node_modules
                if (err || !result) {
                  const fallbackRequest = {
                    ...request,
                    context: {
                      ...request.context,
                      path: mainSiteNodeModules,
                    },
                    path: mainSiteNodeModules,
                  };
                  // Fallback resolution - if this also fails, webpack will handle the error
                  return resolver.doResolve(resolver.hooks.resolve, fallbackRequest, null, resolveContext, callback);
                }
                // Success - return the result
                return callback(null, result);
              });
            } else {
              // Versioned package doesn't have node_modules, go straight to main site's node_modules
              const fallbackRequest = {
                ...request,
                context: {
                  ...request.context,
                  path: mainSiteNodeModules,
                },
                path: mainSiteNodeModules,
              };
              return resolver.doResolve(resolver.hooks.resolve, fallbackRequest, null, resolveContext, callback);
            }
          };

          return tryVersionedPackage();
        }

        // Handle hds-core/hds-react/hds-design-tokens imports from archived doc sources
        if (request?.request && isVersionedArchiveContext(normalizedContextPath)) {
          const fullVersion = extractVersionFromContext(normalizedContextPath);
          const absolutePath = fullVersion
            ? resolveVersionedHdsImportToAbsolute(request.request, fullVersion, __dirname)
            : null;
          if (absolutePath) {
            return resolver.doResolve(
              resolver.hooks.resolve,
              { ...request, request: absolutePath },
              null,
              resolveContext,
              callback,
            );
          }
        }
        // Continue with normal resolution
        return callback();
      });
    }
  }

  config.plugins.push(
    // Redirect bare 'prism-react-renderer' imports from .previous-versions/ to a v1-compat shim.
    // Those archives use the v1 API (Highlight as default export, defaultProps named export)
    // which was removed in v2. Only applies when the importing file is inside .previous-versions/.
    new webpack.NormalModuleReplacementPlugin(
      /^prism-react-renderer$/,
      resource => {
        const normalizedContext = resource.context.split(path.sep).join('/');
        if (normalizedContext.includes('.previous-versions/')) {
          resource.request = path.resolve(__dirname, 'src/utils/prism-v1-compat-shim.js');
        }
      }
    ),
    new webpack.NormalModuleReplacementPlugin(
      /(~?hds-core|hds-react|~?hds-design-tokens)/,
      resource => {
        if (path.isAbsolute(resource.request)) {
          return;
        }

        const normalizedContext = resource.context.split(path.sep).join('/');
        const fullVersion = extractVersionFromContext(normalizedContext);

        // Archived docs: resolve to absolute file paths (pnpm .pnpm symlinks break Sass)
        if (fullVersion && isVersionedArchiveContext(normalizedContext)) {
          const absolutePath = resolveVersionedHdsImportToAbsolute(
            resource.request,
            fullVersion,
            __dirname,
          );
          if (absolutePath) {
            resource.request = absolutePath;
            return;
          }
        }

        // Skip if already versioned (prevent double replacement) outside archives
        if (resource.request.match(/hds-(core|react)-\d+\.\d+\.\d+/)) {
          return;
        }

        if (fullVersion) {
          if (resource.request.includes('~hds-core')) {
            resource.request = resource.request.replaceAll('~hds-core', `hds-core-${fullVersion}`);
          } else if (resource.request.includes('hds-core') && !resource.request.includes('hds-core-')) {
            resource.request = resource.request.replaceAll('hds-core', `hds-core-${fullVersion}`);
          }
          if (resource.request.includes('hds-react') && !resource.request.includes('hds-react-')) {
            resource.request = resource.request.replaceAll('hds-react', `hds-react-${fullVersion}`);
          }
          if (
            resource.request.includes('hds-design-tokens') &&
            !resource.request.includes('hds-design-tokens-')
          ) {
            resource.request = resource.request.replaceAll(
              'hds-design-tokens',
              `hds-design-tokens-${fullVersion}`,
            );
          }
        }
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-4.')) {
          resource.request = resource.request.replace('hds-core', 'hds-4-core');
          resource.request = resource.request.replace('hds-react', 'hds-4-react');
        }
      },
    ),
  );


  const versionedHdsAliases = getVersionedHdsPackageAliases(__dirname);

  actions.setWebpackConfig({
    plugins: [
      // Archived .module.css / .scss import hds-core via css-loader; must resolve to absolute paths
      new webpack.NormalModuleReplacementPlugin(
        /(~?hds-core|hds-react|hds-design-tokens)/,
        resource => {
          if (path.isAbsolute(resource.request)) {
            return;
          }
          const normalizedContext = resource.context.split(path.sep).join('/');
          const fullVersion = extractVersionFromContext(normalizedContext);
          if (!fullVersion || !isVersionedArchiveContext(normalizedContext)) {
            return;
          }
          const absolutePath = resolveVersionedHdsImportToAbsolute(
            resource.request,
            fullVersion,
            __dirname,
          );
          if (absolutePath) {
            resource.request = absolutePath;
          }
        },
      ),
      // We need to provide a polyfill for react-live library to make it work with the latest Gatsby: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      ...config.plugins,
    ],
    resolve: {
      // Prefer site/node_modules over repo root when resolving from .previous-versions/
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
      // Keep pnpm symlink paths (e.g. site/node_modules/hds-core-4.10.0) instead of realpaths under .pnpm
      symlinks: false,
      alias: {
        fs$: path.resolve(__dirname, 'src/fs.js'),
        // prism-react-renderer v2 removed the themes/ subpath exports; .previous-versions/ archives
        // still import from 'prism-react-renderer/themes/github' — shim redirects to v2 themes API.
        'prism-react-renderer/themes/github': path.resolve(__dirname, 'src/utils/prism-github-theme-shim.js'),
        stream: false,
        ...versionedHdsAliases,
      },
      plugins: [
        new DynamicAliasResolverPlugin(),
        ...(config.resolve.plugins || []),
      ],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        // html-validate/dist/cjs/browser.js expects Node's `path` (Webpack 5 does not polyfill core modules).
        path: require.resolve('path-browserify'),
      },
    },
    ignoreWarnings: [
      // html-validate uses dynamic require() for plugin loading — package internals, unfixable.
      (w) => /html-validate/.test(w.module?.resource ?? '') || /Critical dependency/.test(w.message ?? ''),
      // CSS modules (.module.scss): webpack warns "export 'default' was not found" because CSS
      // modules have no explicit ES default export, but default import interop works at runtime.
      (w) => /export 'default'.*was not found.*\.module\.scss/.test(w.message ?? ''),
      // defaultFilter missing from compiled hds-react/lib — needs 'pnpm build:react' to fix properly.
      (w) => /export 'defaultFilter'.*was not found in 'hds-react'/.test(w.message ?? ''),
    ],
    cache: buildSingleVersion,
    optimization: {
      splitChunks: {
        chunks: 'initial',
        minChunks: 2,
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // GraphQL query to fetch frontmatter and rendered MDX content
  const result = await graphql(`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          menuLinks {
            name
            link
            subMenuLinks {
              name
              link
              withDivider
            }
          }
          footerTitle
          footerAriaLabel
        }
      }
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              navTitle
              customLayout
            }
            parent {
              ... on File {
                relativePath
                absolutePath
                ${!buildSingleVersion ?
      `   sourceInstanceName` : ``}
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error('Failed to fetch MDX data');
  }

  const splitPathIntoParts = (path) => path.split('/').filter((l) => !!l);

  const isLinkParentForPage = (parentPath, level) => (page) => {
    const pathParts = splitPathIntoParts(page.slug);
    const ret = pathParts.length === level && pathParts.slice(0, -1).every((pathPart) => parentPath.includes(pathPart));
    return ret;
  };

  const sortByPageTitle = (pageA, pageB) => pageA.title.localeCompare(pageB.title);

  const generateUiIdFromPath = (path, prefix) => {
    const pathStr =
      !path && path === '/'
        ? 'home'
        : path
          .split('/')
          .filter((str) => !!str)
          .join('-');
    return `${prefix}-${pathStr}`;
  };

  const resolveCurrentMenuItem = (version, menuItems, slugWithPrefix) => {
    const rootPath = '/';

    if (slugWithPrefix === rootPath) {
      return menuItems.find(({ link }) => link === rootPath);
    } else {
      const ret = menuItems
        .filter(({ link }) => link !== rootPath)
        .find((menuItem) => slugWithPrefix.startsWith(menuItem.link));
      return ret;
    }
  };

  const getUiSubMenuLinks = (allPages, uiMenuLinks, currentMenuItem) => {
    const subMenuLinks = currentMenuItem?.subMenuLinks || [];
    const subMenuLinksFromPages =
      currentMenuItem && currentMenuItem.link
        ? allPages
          .filter(isLinkParentForPage(currentMenuItem.link, 2))
          .map((page) => ({ name: page.title, title: page.title, link: page.slug }))
          .sort(sortByPageTitle)
        : [];

    const uiSubMenuLinks = [...subMenuLinks, ...subMenuLinksFromPages].map((subMenuLink) => ({
      ...subMenuLink,
      prefixedLink: subMenuLink.link,
      uiId: generateUiIdFromPath(subMenuLink.link, 'side-nav'),
      subLevels: allPages
        .filter(isLinkParentForPage(subMenuLink.link, 3))
        .map((subLevelLink) => ({
          ...subLevelLink,
          uiId: generateUiIdFromPath(subLevelLink.slug, 'side-nav-sub'),
          prefixedLink: subLevelLink.slug,
        }))
        .sort(sortByPageTitle),
    }));

    return uiSubMenuLinks;
  }

  const siteData = result.data.site.siteMetadata;
  const mdxPageData = result.data.allMdx?.edges || [];
  const menuLinks = siteData?.menuLinks || [];

  const uiMenuLinks = menuLinks.map((menuLink) => ({
    ...menuLink,
    uiId: generateUiIdFromPath(menuLink.link, 'nav'),
  }));

  // Create pages dynamically
  result.data.allMdx.edges.forEach(({ node }) => {
    const sourceInstanceName = node.parent?.sourceInstanceName;
    // Extract version from sourceInstanceName (filesystem source)
    const versionFromSource = sourceInstanceName?.startsWith('docs-release-')
      ? sourceInstanceName.replace('docs-release-', '')
      : null;
    const versionRef = versionFromSource ? `release-${versionFromSource}` : null;
    const pathWithVersion = path.join('/', versionRef || '', node.frontmatter.slug);

    try {
      const pageTemplate = require.resolve('./src/components/ContentLayoutWrapper.js');
      // Handle relativePath for both versioned sources and current docs
      const rawRelativePath = node.parent?.relativePath || '';
      const normalizedRelativePath = rawRelativePath.replaceAll('\\', '/');
      const docsPrefix = 'site/src/docs/';
      const docsRelativePath = normalizedRelativePath.includes(docsPrefix)
        ? normalizedRelativePath.substring(normalizedRelativePath.indexOf(docsPrefix) + docsPrefix.length)
        : normalizedRelativePath;
      const contentPath = path.posix.join('./src/docs', docsRelativePath);
      const absoluteContentPath = path.resolve(__dirname, contentPath);

      console.log('createPage() ' + (versionRef ? versionRef : 'latest') + ' ' + contentPath);

      const pageContent = versionRef
        ? (() => {
          // For filesystem sources, use the absolutePath directly
          const absolutePath = node.parent?.absolutePath;
          if (absolutePath && fs.existsSync(absolutePath)) {
            try {
              return require.resolve(absolutePath);
            } catch (e) {
              console.warn(`Could not resolve absolute path ${absolutePath}: ${e.message}`);
            }
          }
          // Fallback: construct path from version and docsRelativePath
          const version = versionRef.replace('release-', '');
          // Use the already-normalized docsRelativePath instead of node.parent.relativePath
          // to avoid double path segments
          const localPath = path.resolve(__dirname, `.previous-versions/helsinki-design-system-${version}/site/src/docs/${docsRelativePath}`);

          if (fs.existsSync(localPath)) {
            try {
              return require.resolve(localPath);
            } catch (e) {
              console.warn(`Could not resolve local path ${localPath}: ${e.message}`);
            }
          }
          // Last resort: try contentPath (for latest docs)
          try {
            return require.resolve(absoluteContentPath);
          } catch (e) {
            console.warn(`Could not resolve any path for ${sourceInstanceName}/${node.parent.relativePath}: ${e.message}`);
            throw e;
          }
        })()
        : require.resolve(absoluteContentPath);

      // filter out duplicate slug entries.
      const allPages = Object.values(
        Object.fromEntries(
          mdxPageData
            .filter(({ node }) => {
              const nodeSourceInstanceName = node?.parent?.sourceInstanceName;
              const nodeVersionRef = nodeSourceInstanceName?.startsWith('docs-release-')
                ? `release-${nodeSourceInstanceName.replace('docs-release-', '')}`
                : null;
              return nodeVersionRef === versionRef;
            })
            .filter(({ node }) => node.frontmatter.slug && node.frontmatter.navTitle)
            .map(({ node }) => [node.frontmatter.slug, { ...node.frontmatter, ...node.fields }])
        ),
      );

      const currentMenuItem = resolveCurrentMenuItem(versionRef, uiMenuLinks, node.frontmatter.slug);
      const uiSubMenuLinks = getUiSubMenuLinks(allPages, uiMenuLinks, currentMenuItem);

      createPage({
        component: `${pageTemplate}?__contentFilePath=${pageContent}`,
        path: pathWithVersion,
        context: {
          id: node.id,
          frontmatter: { ...node.frontmatter, slug: pathWithVersion },
          siteData,
          currentMenuItem,
          uiMenuLinks,
          uiSubMenuLinks
        },
      });
    } catch (e) {
      console.error(e);
    }
  });
};
