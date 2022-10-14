const fs = require('fs');
const searchRepos = require('./helpers/search-repos');
const cloneRepos = require('./helpers/clone-repos');
const runScanner = require('./helpers/run-scanner');
const reposDir = './tmp';
const resultsDir = './results';

const removeTempReposDir = () => {
  console.log(`Removing temporary repo-folder ${reposDir} ...`);
  fs.rmSync(reposDir, { recursive: true, force: true });
  console.log('Repo-folder removed.');
};

const runAnalytics = async () => {
  if (fs.existsSync(reposDir)) {
    removeTempReposDir();
  }

  console.log('Searching repos...');
  const githubToken = process.env.TOKEN;
  const codeRepos = await searchRepos(githubToken);

  /* Remove duplicate repositories and helsinki-design-system from the results. Also make a new array with just the repo information.
  Duplicate repos happen because the search items are package.jsons where hds-react was mentioned. 
  So a repo might have many package.jsons in subfolders.*/
  const validRepos = codeRepos.items
    .filter((value, index, self) => index === self.findIndex((t) => t.repository.id === value.repository.id))
    .filter(({ repository: { name } }) => name !== 'helsinki-design-system')
    .map(({ repository }) => repository);
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
    removeTempReposDir();
  }

  console.log(`Results are generated into ${resultsDir} folder.`);
  console.log(`Process completed.`);
};

runAnalytics();
