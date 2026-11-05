/** @type {import('@city-of-helsinki/license-notices/webpack').ThirdPartyLicensesConfig} */
const thirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/helsinki-design-system',
  // site/ has no license file of its own, the application is under the repository's license
  projectLicenseFile: '../LICENSE',
  // The HDS packages of this monorepo, including the archived versions bundled for older docs
  firstPartyPackages: ['hds-core', 'hds-design-tokens', 'hds-react'],
};

module.exports = { thirdPartyLicensesConfig };
