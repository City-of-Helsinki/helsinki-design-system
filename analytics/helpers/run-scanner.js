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
    const dateString = new Date().toJSON().split(/[:.]/).join('-');
    fs.writeFileSync(`${resultsDir}/${dateString}_HDS_counts_in_${limit - offset}_repos.json`, `${totalStrWithoutMessage}}`);
    fs.writeFileSync(`${resultsDir}/${dateString}_HDS_components_and_props_in_${limit - offset}_repos.json`, `{${componentsStr}`);
    console.log(successMessage)
    return stdout;
  } catch (e) {
    console.error(e);
  }
}

module.exports = runScanner;
