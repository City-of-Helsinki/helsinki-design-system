#!/bin/bash

date=$(date -u +"%Y-%m-%dT%H-%M-%SZ");
# Path to file
FILE_NAME="./results/${date}_HDS_react_versions_in_use.json";

# Call to Github API to find all occurrences of "hds-react" under City-of-Helsinki org.
curl -H  --retry 5 --retry-connrefused --retry-max-time 60 -H "Accept: application/vnd.github+json"  -H "Authorization: token $TOKEN" "https://api.github.com/search/code?q=hds-react+in:file+filename:package.json+org:City-of-Helsinki&per_page=100" | jq '. | .total_count as $total_count | { total_count: $total_count, repositories: [.items[] | {name: .repository.name, url: .repository.html_url, package_url: .git_url, path: .path}]}' > $FILE_NAME

# count variable is used to access the correct object inside the file array
count=0;
# Iterate through the generated file
jq -c '.repositories[]' $FILE_NAME | while read i; do

    # Read the git url for package json
    url=$(echo $i | jq -r '.package_url');
    # Get the contents of package.json through the URL
    content=$(curl -H "Authorization: token $TOKEN" ${url} | jq -r '.content' | base64 --decode)
    # Read the version for hds-react
    version=$(jq '.dependencies."hds-react"' <<< "${content}")
    # If version is null, read it from devDependencies instead
    [[ "$version" = "null" ]] && properVersion=$(jq '.devDependencies."hds-react"' <<< "${content}") || properVersion=$(jq '.dependencies."hds-react"' <<< "${content}");
    # Insert the key value pair "version": "xx.xx" into the json file with sponge
    jq --argjson properVersion "$properVersion" --argjson count "$count" '.repositories[$count] += { version: $properVersion }' $FILE_NAME | sponge $FILE_NAME;
    
    ((count++))
done
# Remove package helsinki-design-system from the list
jq 'del(.repositories[] | select(.name == "helsinki-design-system"))' $FILE_NAME | sponge $FILE_NAME