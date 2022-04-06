# Helsinki Design System Analytics script

A node script to collect the HDS-React package's usage statistics from City of Helsinki Github repositories.

The script does the next steps:
1. Searches all City of Helsinki TypeScript Github repositories. It filters out the Helsinki Design System repository
2. Clones all the found repositories into the local folder
3. Runs React-scanner for repositories to generate reports of HDS-React usage
4. Removes the local temporary repository folder

***Notice! Be careful with the script because it can make lots of Git clones to repositories. 
It will strain the network and might exceed some Github rate limits. Running script requires some disk space and memory as well.***

## Getting started

### Prerequisites
- [Node](https://nodejs.org/en/)
- [Github cli](https://cli.github.com/)
- [React-scanner](https://github.com/moroshko/react-scanner) as globally or locally installed

### Running the script
To collect analytics from a subset of found repositories (for testing purposes), run:
```OFFSET=0 LIMIT=1 node run-analytics.js```

To collect analytics from all found repositories, run:
```node run-analytics.js```
