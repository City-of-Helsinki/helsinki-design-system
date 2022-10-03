const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Function for searching Github repositories that use hds-react under City-of-Helsinki organization.
 * Github API returns a maximum of 100 results per request but this function will fetch everything as long
 * as there is items left to fetch.
 * @param {string} githubToken
 * @param {object | null} cumulativeValue
 * @param {number | null} page
 * @returns
 */
async function searchRepos(githubToken, cumulativeValue, page = 1) {
  try {
    /* Call to Github API. Retry max 5 times with 1 min timeout on transient errors and connection refusals. */
    const response = await exec(
      'curl --retry 5 --retry-connrefused --retry-max-time 60 -H "Accept: application/vnd.github+json"  -H "Authorization: token ' +
        githubToken +
        '" "https://api.github.com/search/code?q=hds-react+in:file+filename:package.json+org:City-of-Helsinki&per_page=100&page=' +
        page +
        '"',
    );
    const data = JSON.parse(response.stdout);
    const totalCount = data.total_count;
    const returnObject = { totalCount, items: cumulativeValue ? cumulativeValue.items.concat(data.items) : data.items };

    /* As long as total count of results is higher than the amount we have gathered so far,
    call this function again recursively until all the data has been gathered. */
    if (totalCount > returnObject.items.length) {
      console.log('Still more repositories left for fetching, please wait...');
      return await searchRepos(githubToken, returnObject, ++page);
    } else {
      console.log('Search is done.');
      return returnObject;
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = searchRepos;
