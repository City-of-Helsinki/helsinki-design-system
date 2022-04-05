const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function fetchRepos() {
  try {
    return exec('gh search repos --owner=City-of-Helsinki --language=typescript --limit=100 --json name,url').then(
      ({ stdout }) => JSON.parse(stdout),
    );
  } catch (e) {
    console.error(e);
  }
}

module.exports = fetchRepos;
