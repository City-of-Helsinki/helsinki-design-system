import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import https from 'node:https';
import * as tar from 'tar';
import extractZip from 'extract-zip';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get current version and extract major version
const currentVersion = packageJson.version;
const currentMajor = Number.parseInt(currentVersion.split('.')[0], 10);

// Extract repository URL from package.json
function getRepositoryUrl() {
  let repo = packageJson.repository;
  
  // If not found in current package.json, try root package.json
  if (!repo) {
    const rootPackageJsonPath = path.resolve(__dirname, '../../package.json');
    if (fs.existsSync(rootPackageJsonPath)) {
      const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
      repo = rootPackageJson.repository;
    }
  }
  
  if (!repo) {
    throw new Error('Repository URL not found in package.json');
  }
  
  // Handle both string and object formats
  const repoUrl = typeof repo === 'string' ? repo : repo.url;
  // Remove .git suffix if present
  return repoUrl.replace(/\.git$/, '');
}

const repoUrl = getRepositoryUrl();

console.log(`Current version: ${currentVersion}`);

// Calculate last two major versions
const majorVersions = [currentMajor - 1, currentMajor - 2].filter(v => v > 0);

// Function to get latest version for a given major version
function getLatestVersionForMajor(packageName, majorVersion) {
  // Sanitize packageName to prevent command injection
  // Allow alphanumeric characters, hyphens, underscores, slashes (for scoped packages), and @ (for scoped packages)
  if (!/^[@a-zA-Z0-9_/-]+$/.test(packageName)) {
    throw new Error(`Invalid package name: ${packageName}`);
  }
  
  try {
    const output = execSync(
      `npm view ${packageName} versions --json`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    
    const versions = JSON.parse(output);
    // Filter versions that match the major version
    const matchingVersions = versions.filter(v => {
      const vMajor = Number.parseInt(v.split('.')[0], 10);
      return vMajor === majorVersion;
    });
    
    if (matchingVersions.length === 0) {
      return null;
    }
    
    // Sort and get the latest version
    const sortedVersions = matchingVersions.sort((a, b) => {
      const aParts = a.split('.').map(Number);
      const bParts = b.split('.').map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || 0;
        const bPart = bParts[i] || 0;
        if (bPart !== aPart) {
          return bPart - aPart;
        }
      }
      return 0;
    });
    
    return sortedVersions[0];
  } catch (error) {
    console.error(`Error getting version for ${packageName}@${majorVersion}.x: ${error.message}`);
    return null;
  }
}

// Function to download a file from URL
function downloadFile(url, dest) {
  const MAX_REDIRECTS = 5;
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    let finished = false;

    function cleanup(err) {
      if (finished) {
        return;
      }
      finished = true;

      // Ensure the file stream is destroyed in all error/success paths
      file.destroy();

      if (err) {
        // Best-effort cleanup of a partially written file
        fs.unlink(dest, () => {
          // Ignore unlink errors; original error is more important
          reject(err);
        });
      } else {
        resolve();
      }
    }

    function handleFileFinish() {
      // Ensure the underlying fd is closed and detect errors
      const handleFileClose = (err) => {
        if (err) {
          cleanup(err);
        } else {
          cleanup();
        }
      };
      file.close(handleFileClose);
    }

    function handleResponse(response, redirectsRemaining) {
      const statusCode = response.statusCode;

      // Handle redirects
      if (statusCode === 301 || statusCode === 302 || statusCode === 303 || statusCode === 307 || statusCode === 308) {
        const location = response.headers.location;
        if (!location) {
          cleanup(new Error('Redirect status code received but no Location header present'));
          return;
        }
        if (redirectsRemaining <= 0) {
          cleanup(new Error('Too many redirects while downloading file'));
          return;
        }
        // Follow redirect
        makeRequest(location, redirectsRemaining - 1);
        return;
      }

      // Validate HTTP status codes
      if (statusCode < 200 || statusCode >= 300) {
        cleanup(new Error(`HTTP error ${statusCode}: ${response.statusMessage || 'Unknown error'}`));
        return;
      }

      // Propagate errors from the response stream
      response.on('error', cleanup);
      response.pipe(file);

      // Handle errors on the file stream itself
      file.on('error', cleanup);
      file.on('finish', handleFileFinish);
    }

    function makeRequest(currentUrl, redirectsRemaining) {
      const req = https.get(currentUrl, (response) => {
        handleResponse(response, redirectsRemaining);
      });
      req.on('error', cleanup);
    }

    makeRequest(url, MAX_REDIRECTS);
  });
}

// Extract .tgz file to site/node_modules
async function extractTgzToNodeModules(tgzPath, siteNodeModulesDir) {
  const tgzFileName = path.basename(tgzPath, '.tgz');
  const targetDir = path.join(siteNodeModulesDir, tgzFileName);
  
  if (fs.existsSync(targetDir)) {
    console.log(`  ✓ ${tgzFileName} already extracted to ${targetDir}, skipping`);
    return targetDir;
  }
  
  if (!fs.existsSync(siteNodeModulesDir)) {
    fs.mkdirSync(siteNodeModulesDir, { recursive: true });
  }
  
  const tempExtractDir = path.join(siteNodeModulesDir, '.temp-extract');
  if (!fs.existsSync(tempExtractDir)) {
    fs.mkdirSync(tempExtractDir, { recursive: true });
  }
  
  try {
    console.log(`  Extracting ${path.basename(tgzPath)} to ${targetDir}...`);
    
    // Extract tar.gz using tar package
    await tar.x({
      file: tgzPath,
      cwd: tempExtractDir,
    });
    
    // npm packages typically extract to a "package" directory
    const extractedPackageDir = path.join(tempExtractDir, 'package');
    if (fs.existsSync(extractedPackageDir)) {
      fs.renameSync(extractedPackageDir, targetDir);
    } else {
      // Handle other extraction structures
      const contents = fs.readdirSync(tempExtractDir);
      if (contents.length === 1) {
        const singleItem = path.join(tempExtractDir, contents[0]);
        if (fs.statSync(singleItem).isDirectory()) {
          fs.renameSync(singleItem, targetDir);
        } else {
          fs.mkdirSync(targetDir, { recursive: true });
          fs.renameSync(singleItem, path.join(targetDir, contents[0]));
        }
      } else {
        fs.mkdirSync(targetDir, { recursive: true });
        contents.forEach(item => {
          fs.renameSync(path.join(tempExtractDir, item), path.join(targetDir, item));
        });
      }
    }
    
    fs.rmSync(tempExtractDir, { recursive: true, force: true });
    console.log(`  ✓ Successfully extracted to ${targetDir}`);
    return targetDir;
  } catch (error) {
    console.error(`  ✗ Error extracting ${tgzPath}: ${error.message}`);
    if (fs.existsSync(tempExtractDir)) {
      fs.rmSync(tempExtractDir, { recursive: true, force: true });
    }
    return null;
  }
}

// Function to download npm package as .tgz
async function downloadNpmPackage(packageName, version, previousVersionsDir) {
  const tgzFileName = `${packageName}-${version}.tgz`;
  const tgzPath = path.join(previousVersionsDir, tgzFileName);
  
  // Skip if already downloaded
  if (fs.existsSync(tgzPath)) {
    console.log(`  ✓ ${tgzFileName} already exists, skipping download`);
    return tgzPath;
  }
  
  const npmUrl = `https://registry.npmjs.org/${packageName}/-/${tgzFileName}`;
  
  try {
    console.log(`  Downloading ${tgzFileName}...`);
    await downloadFile(npmUrl, tgzPath);
    console.log(`  ✓ Successfully downloaded ${tgzFileName}`);
    return tgzPath;
  } catch (error) {
    console.error(`  ✗ Error downloading ${tgzFileName}: ${error.message}`);
    return null;
  }
}

// Check if versioned docs directory already exists
function findExistingDocsDir(previousVersionsDir, version) {
  try {
    const contents = fs.readdirSync(previousVersionsDir);
    const matchingDir = contents.find(item => {
      const itemPath = path.join(previousVersionsDir, item);
      try {
        // Stricter matching: must start with 'helsinki-design-system-' and end with version (without 'v' prefix)
        return fs.statSync(itemPath).isDirectory() && 
               item.startsWith('helsinki-design-system-') && 
               item === `helsinki-design-system-${version}`;
      } catch {
        return false;
      }
    });
    return matchingDir ? path.join(previousVersionsDir, matchingDir) : null;
  } catch {
    return null;
  }
}

// Install dependencies for an extracted package
async function installPackageDependencies(packageDir) {
  const packageJsonPath = path.join(packageDir, 'package.json');
  const nodeModulesPath = path.join(packageDir, 'node_modules');
  
  // Check if package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`  ⚠ No package.json found in ${packageDir}, skipping dependency installation`);
    return;
  }
  
  // Check if dependencies are already installed
  if (fs.existsSync(nodeModulesPath)) {
    console.log(`  ✓ Dependencies already installed for ${path.basename(packageDir)}, skipping`);
    return;
  }
  
  try {
    console.log(`  Installing dependencies for ${path.basename(packageDir)}...`);
    
    // Use yarn install --production with --modules_folder to install directly to the versioned node_modules path
    execSync(`yarn install --production --modules_folder "${nodeModulesPath}"`, {
      cwd: packageDir,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    
    console.log(`  ✓ Successfully installed dependencies for ${path.basename(packageDir)}`);
  } catch (error) {
    console.error(`  ✗ Error installing dependencies for ${path.basename(packageDir)}: ${error.message}`);
    // Don't throw - allow the process to continue even if dependency installation fails
    // The webpack resolver fallback will handle missing dependencies
  }
}

// Process npm packages for a version
async function processNpmPackages(version, previousVersionsDir, siteNodeModulesDir) {
  const packages = ['hds-core', 'hds-react'];
  const packageDirs = packages.map(pkg => path.join(siteNodeModulesDir, `${pkg}-${version}`));
  const tgzPaths = packages.map(pkg => path.join(previousVersionsDir, `${pkg}-${version}.tgz`));
  
  const allExist = packageDirs.every(dir => fs.existsSync(dir));
  if (allExist) {
    console.log(`✓ npm packages for version ${version} already exist in node_modules, checking dependencies...`);
    // Even if packages exist, check if dependencies are installed
    for (const packageDir of packageDirs) {
      if (fs.existsSync(packageDir)) {
        await installPackageDependencies(packageDir);
      }
    }
    return;
  }
  
  console.log(`Processing npm packages for version ${version}...`);
  
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const packageDir = packageDirs[i];
    const tgzPath = tgzPaths[i];
    
    if (fs.existsSync(packageDir)) {
      // Package exists, but check if dependencies are installed
      await installPackageDependencies(packageDir);
      continue;
    }
    
    let finalTgzPath = tgzPath;
    if (fs.existsSync(tgzPath)) {
      console.log(`  ✓ ${path.basename(tgzPath)} already exists, skipping download`);
    } else {
      finalTgzPath = await downloadNpmPackage(pkg, version, previousVersionsDir);
      if (!finalTgzPath) continue;
    }
    
    await extractTgzToNodeModules(finalTgzPath, siteNodeModulesDir);
    
    // Install dependencies for the extracted package
    await installPackageDependencies(packageDir);
  }
}

// Download and extract versioned documentation zip
async function downloadAndExtractDocs(version, previousVersionsDir) {
  const tag = `v${version}`;
  const zipUrl = `${repoUrl}/archive/refs/tags/${tag}.zip`;
  const zipPath = path.join(previousVersionsDir, `${version}.zip`);
  
  if (fs.existsSync(zipPath)) {
    console.log(`Zip file for ${version} already exists, extracting...`);
  } else {
    console.log(`Downloading ${version} from ${zipUrl}...`);
    await downloadFile(zipUrl, zipPath);
  }
  
  console.log(`Extracting ${version}...`);
  
  try {
    // Extract zip using extract-zip package
    await extractZip(zipPath, { dir: previousVersionsDir });
    
    // GitHub archives create directories without 'v' prefix: helsinki-design-system-{version}
    const extractedFolder = path.join(previousVersionsDir, `helsinki-design-system-${version}`);
    
    // Clean up zip file only after confirming successful extraction
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }
    
    console.log(`✓ Successfully extracted ${version} to ${extractedFolder}`);
    return extractedFolder;
  } catch (error) {
    console.error(`✗ Error extracting ${version} from ${zipPath}: ${error.message}`);
    // Preserve the downloaded zip file for inspection or retry
    // The zip file is kept (not deleted) so it can be inspected or retried
    throw error;
  }
}

// Main function to process versioned documentation and npm packages
async function processVersionedDocs(version) {
  const previousVersionsDir = path.resolve(__dirname, '../.previous-versions');
  const siteNodeModulesDir = path.resolve(__dirname, '../node_modules');
  
  // Ensure directories exist
  if (!fs.existsSync(previousVersionsDir)) {
    fs.mkdirSync(previousVersionsDir, { recursive: true });
  }
  
  // Check if docs already extracted
  const existingDocsDir = findExistingDocsDir(previousVersionsDir, version);
  if (existingDocsDir) {
    console.log(`✓ Version ${version} already extracted (found ${existingDocsDir}), skipping zip download`);
  } else {
    try {
      await downloadAndExtractDocs(version, previousVersionsDir);
    } catch (error) {
      console.error(`✗ Error downloading/extracting ${version}: ${error.message}`);
      return null;
    }
  }
  
  // Process npm packages
  await processNpmPackages(version, previousVersionsDir, siteNodeModulesDir);
  
  // Return the existing directory or construct the expected path
  // GitHub archives create directories without 'v' prefix: helsinki-design-system-{version}
  return existingDocsDir || path.join(previousVersionsDir, `helsinki-design-system-${version}`);
}

// Main execution
const versions = majorVersions
  .map(major => getLatestVersionForMajor('hds-core', major))
  .filter(Boolean);

if (versions.length > 0) {
  console.log(`Found versions: ${versions.join(', ')}`);
}

for (const version of versions) {
  await processVersionedDocs(version);
}

console.log('✓ Version check and download completed successfully');
process.exit(0);
