const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function cloneRepos(repos, reposDir) {
  if (!fs.existsSync(reposDir)) {
    fs.mkdirSync(reposDir);
  }

  const clonePromises = repos.map(({ name, url }) =>
    exec(`gh repo clone ${url} ${reposDir}/${name}`)
      .then(() => {
        console.log(`Repo cloned, name: ${name}`);
        return name;
      })
      .catch(() => {
        console.log(`Repo clone failed, name: ${name}`);
      }),
  );

  try {
    return Promise.all(clonePromises);
  } catch (e) {
    console.error(e);
  }
}

module.exports = cloneRepos;
