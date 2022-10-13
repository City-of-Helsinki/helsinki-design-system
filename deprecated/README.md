# Deprecated

## Content

This folder holds the deprecated versions of the HDS:

1. Old documentation site
2. Deprecated versions of hds storybooks

## Purpose

The deprecated versions are published under versioned folders.

In the release pipeline (.github/workflows/gh-pages), the content of these files
is copied under the corresponding version folder and are accessible in
production in the following manner:

1. Old documentation site: hds.hel.fi/v1
2. Version 1 react storybook: hds.hel.fi/v1/storybook/react
3. Version 1 core storybook: hds.hel.fi/v1/storybook/core

The deprecated versions are stored here as built code to speed up the release process
by not needing to build them again.

## Making changes

Do not rename the folders inside this folder without making corresponding changes
to the release pipeline. In the rare case where you would need to make a change to the
old documentation site or storybooks in production, follow this:

1. Checkout v1-latest branch from git
2. Make changes to components or the old documentation site.
3. If you have changes to components, then release npm changes but do not publish 
the old site from git v1, as it would override the new site. So you need to
modify the gh-pages.yml workflow.
4. Build storybooks
5. Build site
6. Copy content of the built storybooks and old site somewhere out of the repo temporarily
7. Checkout current version from git
8. Move the built storybooks and old site code inside deprecated/v1/ respective folders
9. Make a pull request and merge it to master. During the merge, the updated old site
and storybooks will be released under the v1 folder by Github actions.
