#!/usr/bin/env node

/**
 * Copies files from given path (a glob pattern) to target path.
 * The prefix part of the glob pattern (before first "*") is replaced with target path.
 * For example -source "src/x/y/*.scss" with -target "lib/comp"
 * will copy all matching files from "src/x/y/<rest of path>" to "lib/comp/<rest of path>"
 * Args:
 *  - "-s" or "--source" path to scan. It is an glob pattern. Example: 'src\/components\/**\/*.scss'. (escape "\/" added to slashes only to avoid comment block)
 *  - "-t" or "--target" Target path
 *  - "-v" verbose. Enable verbose output.
 */

const { glob } = require('glob');
var fs = require('fs/promises');
var path = require('path');

function createPathReplacer(globPath, targetFolder) {
  const globPrefix = globPath.split('*')[0];
  const targetPrefix = targetFolder.endsWith('/') ? targetFolder : `${targetFolder}/`;
  return (filePath) => {
    return filePath.replace(globPrefix, targetPrefix);
  };
}

/**
 * Check if dir exists
 * @param {} filePath
 * @returns
 */
async function doesDirectoryExist(filePath) {
  try {
    const stats = await fs.lstat(filePath);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 * Create the path for a file is does not exist
 * @param {} targetPath
 * @returns
 */
async function createFileFolders(targetPath, verbose) {
  const dirname = path.dirname(targetPath);
  const exist = await doesDirectoryExist(dirname);
  if (!exist) {
    if (verbose) {
      console.log('Creating directory', dirname);
    }
    await fs.mkdir(dirname, { recursive: true });
  }
}

/**
 * Gets all files with glob and copies them to new location
 */
async function copyFiles(args) {
  const { globPath, targetPath, verbose } = args;
  let error;
  return new Promise(async (resolve, reject) => {
    const filesWithJs = await glob(globPath);
    const pathReplacer = createPathReplacer(globPath, targetPath);
    for (const filePath of filesWithJs) {
      if (!error) {
        const targetLocation = pathReplacer(filePath);
        if (verbose) {
          console.log('Copying file', filePath, targetLocation);
        }
        try {
          await createFileFolders(targetLocation, verbose);
          await fs.copyFile(filePath, targetLocation);
        } catch (e) {
          error = e;
        }
      }
    }
    error ? reject(error) : resolve();
  });
}

function argToObjectOrString(args) {
  let pendingArg = '';
  const argNameMap = {
    v: 'verbose',
    s: 'globPath',
    source: 'globPath',
    t: 'targetPath',
    target: 'targetPath',
  };
  const unknownArgs = [];
  const setValue = (obj, key, value) => {
    const mappedKey = argNameMap[key] || key;
    obj[mappedKey] = value;
  };
  const result = args.reduce((obj, value, index) => {
    if (index < 2) {
      return obj;
    }
    if (value && value.startsWith('-')) {
      pendingArg = value.replace(/\-/g, '');
    } else if (pendingArg) {
      setValue(obj, pendingArg, value);
      pendingArg = '';
    } else {
      unknownArgs[index] = value;
    }
    return obj;
  }, {});
  if (pendingArg) {
    setValue(result, pendingArg, true);
  }
  if (unknownArgs) {
    result.unknownArgs = unknownArgs;
  }
  return result;
}

copyFiles(argToObjectOrString(process.argv));
