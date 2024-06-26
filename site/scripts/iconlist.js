const fs = require('fs');
const chalk = require('chalk');

// This script generates icon list.mdx file from exists icon files
// script should run from site -directory

const listFileHeader = `---
slug: '/foundation/visual-assets/icons/list'
title: 'Icons - List of all icons'
---

import * as HDS from 'hds-react';

import TabsLayout from './tabs.mdx';

export default ({ children, pageContext }) => <TabsLayout pageContext={pageContext}>{children}</TabsLayout>;

## List of all icons
`

let iconArray = [];

const listMdx = 'src/docs/foundation/visual-assets/icons/list.mdx';
const listMdxOutput = listMdx;

// icon_group.json is in site -directory, it has get on Github Workflow step
const icon_groups_json = "./icon_group.json"; 

let iconGroups = new Map();
const iconGroupsJson = JSON.parse(fs.readFileSync(icon_groups_json, 'utf-8'));
iconGroupsJson.forEach(function(item) {
    iconGroups.set(item.icon, item.group);
});

const iconDirectoryCore = '../packages/core/src/icons';
const iconDirectoryReact = '../packages/react/src/icons';

const iconFilesCore = fs.readdirSync(iconDirectoryCore);
const iconFilesReact = fs.readdirSync(iconDirectoryReact);

const continueWarning = (msg) => {
    console.log(`${chalk.red.bold('Warning:')} ${chalk.italic(msg)}`);
};
  
// read common usage -from exists list-mdx
function readLine (line) {
    if (! line.startsWith('| <HDS')) return;

    const lineArr = line.split("|").map(item => item.trim());

    if (lineArr[4] !== '') {
        iconArrayAddCommonUsage( lineArr[2].replaceAll('`', ''), lineArr[4])
    }
}

// convert filenames from camel case to snake case
function convertCamelToSnake(str){
    const snakeCase =  str.replace(/([a-zA-Z])(?=[A-Z])/g,'$1-').toLowerCase()

    if (!iconFilesCore.includes(`${snakeCase}.css`)) {
        continueWarning(`Core icon for react icon ${str} not found!`)
        return ''
    }

    return snakeCase
}

// get icon group
function getIconGroup (icon) {
    if (!iconGroups.has(icon)) {
        continueWarning(`Icon ${icon} has not group!`)
        return ''
    }

    return iconGroups.get(icon);
}

function iconArrayAddCommonUsage (coreName, commonusage) {
    if (commonusage === '') return

    iconArray.forEach(function(item) {
        if (item.core === coreName) {
            item.commonusage = commonusage
        }
    })
}

// read icon files from directory
function readIconFiles (iconfile) {
    if (! iconfile.startsWith('Icon')) return;
    if (! iconfile.endsWith('.tsx')) return;

    const reactName = iconfile.substring(0,iconfile.indexOf(".tsx"));
    const coreName = convertCamelToSnake(reactName.substring(4));
    if (coreName === '') return

    const groupName = getIconGroup(coreName);
    if (groupName === '') return

    iconArray.push({group: groupName, core: coreName, react: reactName, commonusage: ''});
}

// from https://github.com/nijikokun/array-to-table
function arrayToTable (array, columns, alignment = 'left') {
    var table = ""
    var separator = {
      'left': ':---',
      'right': '---:',
      'center': '---'
    }
  
    // Generate column list
    var cols = columns
      ? columns.split(",")
      : Object.keys(array[0])
  
    // Generate table headers
    table += "| " + cols.join(" | ")
    table += " |\n"
  
    // Generate table header seperator
    table += "| " + cols.map(function () {
      return separator[alignment] || separator.center
    }).join(' | ')
    table += " |\n"
  
    // Generate table body
    array.forEach(function (item) {
      table += "| " + cols.map(function (key) {
        return String(item[key] || "")
      }).join(" | ") + " |\n"
    })
  
    // Return table
    return table
}

function outputGroupHeader(groupName) {
    return (`\n### ${groupName}\n\n`)
}
function outputGroup(groupName, groupIcons) {
    return  outputGroupHeader(groupName) + arrayToTable(groupIcons, null, 'left')
}
function outputFile () {
    let iconTables = new Map();

    // set data to writeable format
    iconArray.forEach(function(item) {
        if (!iconTables.has(item.group)) {
            iconTables.set(item.group, [])
        }
        let data = {
            Icon: `<HDS.${item.react} />`, 
            Core: `\`${item.core}\``,  
            React: `\`${item.react}\``
        }
        data['Common usage']=item.commonusage

        iconTables.get(item.group).push(data)
    })

    // generate output data
    let output = listFileHeader;
    let tableNumber = 1;
    // sort icon groups
    const iconTablesSorted = new Map([...iconTables].sort());
    iconTablesSorted.forEach(function(groupIcons, groupName) {
        groupIcons.push({ Icon: `[Table ${tableNumber++}:${groupName} icons]` })
        output += outputGroup(groupName, groupIcons)
    })

    fs.writeFileSync(listMdxOutput, output);
}

const iconlist = async () => {
    // get icons from react directory
    iconFilesReact.forEach(readIconFiles)

    // read currect list.mdx to get common usage information
    fs.readFileSync(listMdx, 'utf-8').split('\n').forEach(readLine)

    // write list.mdx again
    outputFile();
}

iconlist();
