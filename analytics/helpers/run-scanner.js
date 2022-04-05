const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runScanner (offset, limit, resultsDir) {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
  }

  try {
    const { stdout } = await exec(`npx react-scanner . -c scanner.config.js`);
    const [totalStr, componentsStr] = stdout.split('}\n{');
    const totalLines = totalStr.split('\n');
    const successMessage = totalLines[0];
    const totalStrWithoutMessage = totalLines.splice(1, totalLines.length).join('\n');
    const dateInMs = new Date().valueOf();
    fs.writeFileSync(`${resultsDir}/results-total-${offset}-${limit}-${dateInMs}.json`, `${totalStrWithoutMessage}}`);
    fs.writeFileSync(`${resultsDir}/results-component-${offset}-${limit}-${dateInMs}.json`, `{${componentsStr}`);
    console.log(successMessage)
    return stdout;
  } catch (e) {
    console.error(e);
  }
}

module.exports = runScanner;
