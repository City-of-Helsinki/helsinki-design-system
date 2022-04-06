const fs = require('fs');
const searchRepos = require('./helpers/search-repos');
const cloneRepos = require('./helpers/clone-repos');
const runScanner = require('./helpers/run-scanner');
const reposDir = './tmp';
const resultsDir = './lib';

const runAnalytics = async () => {
  console.log('Searching repos...');
  const repos = await searchRepos();
  const validRepos = repos.filter(({ name }) => name !== 'helsinki-design-system');
  const sortedRepos = validRepos.sort((a, b) => a.name.localeCompare(b.name));
  const offset = process.env.OFFSET || 0;
  const limit = process.env.LIMIT || sortedRepos.length;
  console.log(`Found ${sortedRepos.length} repo(s).`);

  const reposToClone = sortedRepos.slice(offset, limit);
  console.log(`Starting to clone ${reposToClone.length} repos...`);
  const clonedRepoNames = await cloneRepos(reposToClone, reposDir);
  console.log(`Cloned ${clonedRepoNames.length} repo(s).`);

  console.log('Starting to scan repos. This might take a while...');
  await runScanner(offset, limit, resultsDir);
  console.log('Scanning completed.');

  if (fs.existsSync(reposDir)) {
    console.log(`Starting to remove temporary repo-folder ${reposDir} ...`);
    fs.rmSync(reposDir, { recursive: true, force: true });
    console.log('Repo-folder removed.');
  }

  console.log(`Results are generated into ${resultsDir} folder.`);
  console.log(`Process completed.`);
};

runAnalytics();
