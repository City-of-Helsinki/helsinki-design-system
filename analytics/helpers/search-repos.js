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
    const response = await exec(`TOKEN=${githubToken} PAGE=${page} bash github-api-call.sh`);
    const data = JSON.parse(response.stdout);
    const totalCount = data.total_count;
    const returnObject = { totalCount, items: cumulativeValue ? cumulativeValue.items.concat(data.items) : data.items };

    /* As long as total count of results is higher than the amount we have gathered so far,
    call this function again recursively until all the data has been gathered. */
    if (totalCount > returnObject.items.length) {
      return await searchRepos(githubToken, returnObject, ++page);
    } else {
      /* Fetching all the data is done */
      console.log(JSON.stringify(returnObject))
      return returnObject;
    }
  } catch (e) {
    console.error(e);
  }
}

/* This is to support calling this function from the command line */
if (process.argv[2]) {
  const token = process.argv[2];
  searchRepos(token);
}

module.exports = searchRepos;
