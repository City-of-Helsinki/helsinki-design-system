const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// https://stackoverflow.com/questions/53948280/how-to-throttle-promise-all-to-5-promises-per-second/67271450#67271450
const throttlePromises = async (promiseFunctions) => {
  const MAX_IN_PROCESS = 5;
  const results = new Array(promiseFunctions.length);

  async function doPatch(startIndex) {
    const currentPatch = promiseFunctions.slice(startIndex, startIndex + MAX_IN_PROCESS);
    const currentPatchResults = await Promise.all(currentPatch.map((promiseFunction) => promiseFunction()));
    for (let ix = 0; ix < currentPatchResults.length; ix++) {
      results[ix + startIndex] = currentPatchResults[ix];
    }
  }

  for (let currentIndex = 0; currentIndex < promiseFunctions.length; currentIndex += MAX_IN_PROCESS) {
    console.log(
      `Cloning patch of repos from ${currentIndex} to ${
        currentIndex + MAX_IN_PROCESS < promiseFunctions.length
          ? currentIndex + MAX_IN_PROCESS
          : promiseFunctions.length
      }`,
    );
    await doPatch(currentIndex);
  }
  return results;
};

async function cloneRepos(repos, reposDir) {
  if (!fs.existsSync(reposDir)) {
    fs.mkdirSync(reposDir);
  }

  const clonePromiseFunctions = repos.map(({ name, html_url }) => () =>
    exec(`gh repo clone ${html_url} ${reposDir}/${name}`)
      .then(() => {
        console.log(`Repo cloned, name: ${name}`);
        return name;
      })
      .catch(() => {
        console.log(`Repo clone failed, name: ${name}`);
      }),
  );

  try {
    return throttlePromises(clonePromiseFunctions);
  } catch (e) {
    console.error(e);
  }
}

module.exports = cloneRepos;
