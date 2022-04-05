const fs = require('fs');
const searchRepos = require('./helpers/search-repos');
const cloneRepos = require('./helpers/clone-repos');
const runScanner = require('./helpers/run-scanner');
const reposDir = './tmp';
const resultsDir = './lib';

const runAnalytics = async () => {
  console.log('Searching repos');
  const repos = await searchRepos();
  const validRepos = repos.filter(({ name }) => name !== 'helsinki-design-system');
  const sortedRepos = validRepos.sort((a, b) => a.name.localeCompare(b.name));
  const offset = process.env.OFFSET || 0;
  const limit = process.env.LIMIT || sortedRepos.length;
  console.log('Repos total:', sortedRepos.length);

  const reposToClone = sortedRepos.slice(offset, limit);
  console.log('Starting to clone repos. Total number of repos to clone:', reposToClone.length);
  const names = await cloneRepos(reposToClone, reposDir);
  console.log('Cloned repos, total:', names.length);

  console.log('Starting to scan repos');
  await runScanner(offset, limit, resultsDir);
  console.log('Scanner completed');

  if (fs.existsSync(reposDir)) {
    console.log('Starting to remove repo-folder', reposDir);
    fs.rmSync(reposDir, { recursive: true, force: true });
    console.log('Repo-folder removed');
  }

  console.log(`Results generated in the ${resultsDir} folder. Process completed`);
};

runAnalytics();
