#!/bin/bash
# Set environment variable to local variable
TOKEN=$GITHUB_TOKEN
# Call to Github API to find all occurrences of "hds-react" under City-of-Helsinki org.
curl -H "Accept: application/vnd.github+json"  -H "Authorization: token $TOKEN" "https://api.github.com/search/code?q=hds-react+in:file+filename:package.json+org:City-of-Helsinki" | jq '[.items[] | {name: .repository.name, html_url: .repository.html_url, package_url: .git_url}]' > hds-react-version-usage.json

# count variable is used to access the correct object inside hds-react-version-usage.json array
count=0;
# Iterate through hds-react-version-usage.json file
jq -c '.[]' hds-react-version-usage.json | while read i; do

    # Read the git url for package json
    url=$(echo $i | jq -r '.package_url');
    # Get the contents of package.json through the URL
    content=$(curl -H "Authorization: token $TOKEN" ${url} | jq -r '.content' | base64 --decode)
    # Read the version for hds-react
    version=$(jq '.dependencies."hds-react"' <<< "${content}")
    # If version is null, read it from devDependencies instead
    [[ "$version" = "null" ]] && properVersion=$(jq '.devDependencies."hds-react"' <<< "${content}") || properVersion=$(jq '.dependencies."hds-react"' <<< "${content}");
    # Insert the key value pair "version": "xx.xx" into the hds-react-version-usage.json with sponge
    jq --argjson properVersion "$properVersion" --argjson count "$count" '.[$count] += { version: $properVersion }' hds-react-version-usage.json | sponge hds-react-version-usage.json;
    
    ((count++))
done
# Remove package helsinki-design-system from the list
jq 'del(.[] | select(.name == "helsinki-design-system"))' hds-react-version-usage.json | sponge hds-react-version-usage.json
