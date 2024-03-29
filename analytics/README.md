# Helsinki Design System Analytics script

A node script to collect the HDS-React package's usage statistics from City of Helsinki Github repositories.

The script does the next steps:
1. Searches all City of Helsinki Github repositories that use hds-react package. It filters out the Helsinki Design System repository
2. Clones all the found repositories into the local folder
3. Runs React-scanner for repositories to generate reports of HDS-React usage
4. Removes the local temporary repository folder

***Notice! Be careful with the script because it can make lots of Git clones to repositories. 
It will strain the network and might exceed some Github rate limits. Running script requires some disk space and memory as well.***

## Getting started

### Prerequisites
- [Node](https://nodejs.org/en/)
- [Github cli](https://cli.github.com/)
- Github account
- [Github PAT for authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [React-scanner](https://github.com/moroshko/react-scanner) as globally or locally installed

### Running the script
Set your Github PAT to environment variable called `GITHUB_TOKEN` or inject it into the command below.
To collect analytics from a subset of found repositories (for testing purposes), run:
```OFFSET=0 LIMIT=1 TOKEN=$GITHUB_TOKEN node run-analytics.js```

To collect analytics from all found repositories, run:
```TOKEN=$GITHUB_TOKEN node run-analytics.js```

## HDS version usage analytics: collect data of HDS versions in repos
The bash script file `find-hds-react-version-usage.sh` under helpers folder calls Github API and finds all `hds-react` occurrences in code under the City of Helsinki organisation and gets the corresponding repository name, Github URL, path to the package.json file and hds-react version and puts them in a JSON file.

### How to use it

Requirements for running the script:
- Github account
- Personal Access Token (PAT for short) for Github
- [brew](https://brew.sh/)
- [jq](https://stedolan.github.io/jq/) - for JSON handling
- sponge library - for file management

#### Github Personal Access Token
The script uses an environment variable called `GITHUB_TOKEN` which is Personal Access Token (PAT for short) which you can obtain from your [Github settings](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). If you can't be bothered, you can replace the `GITHUB_TOKEN` in the script with your PAT.
The PAT token requires the following permissions: repo, admin:public_key and project.

#### Brew, jq and sponge
Install brew for MacOS and Linux with this command: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"``

jq: `brew install jq`

sponge: `brew install sponge`

### Running the script
Run the script in the terminal with `TOKEN=$GITHUB_TOKEN bash find-hds-react-version-usage.sh` while in the helpers folder.

The script produces a JSON file under results folder that contains an array of objects with the name and Github URL of the repository, which hds-react version it uses and the path to the package.json file where hds-react was mentioned. The path is useful information to determine if subfolders of a repository use the same hds-react version.