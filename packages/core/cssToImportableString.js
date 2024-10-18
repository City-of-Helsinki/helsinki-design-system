#!/usr/bin/env node

/**
 * Converts a css file to an importable .ts file, by copying the contents of the css file and prefixing it with "export default"
 * Args:
 *  - "-d" or "--directory" path to scan. It is an glob pattern. Example: 'lib\/components\/**\/*.min.css'. (escape "\/" added to slashes only to avoid comment block)
 *  - "-t" or "--targetFiles" a comma separated list of files to copy. Example 'cookieConsent.min.css,button/button.min.css'.
 *  - "-v" verbose. Enable verbose output.
 */

const { glob } = require('glob');
var fs = require('fs/promises');

/**
 * Returns true, if fullFilePath ends with any of the targetFiles i.e. file is listed
 */
function isMatchingFile(targetFiles, fullFilePath) {
  return targetFiles.findIndex((listPath) => fullFilePath.endsWith(listPath)) > -1;
}

/**
 * Changes path/to/file/with.any.ext to path/to/file/with.newExt
 */
function createNewFileExt(file, ext) {
  const baseBeforeDots = file.split('.')[0];
  return `${baseBeforeDots}${ext}`;
}

function cssToExportedString(css) {
  return `export default \`${css}\`;`;
}

/**
 * Reads a file and resolves with contents or an object with error
 */
async function getFileContent(path) {
  try {
    return await fs.readFile(path, 'utf8');
  } catch (error) {
    return Promise.resolve({
      error,
    });
  }
}

/**
 * Writes a file and resolves with undefined or an object with error
 */
async function save(path, contents) {
  try {
    return await fs.writeFile(path, contents);
  } catch (error) {
    return Promise.resolve({
      error,
    });
  }
}

/**
 * Reads a file and writes its contents with "export default" prefix to a new file.
 */
async function createNewFile(path) {
  const readResult = await getFileContent(path);
  if (readResult.error) {
    return Promise.resolve(readResult.error);
  }
  const exportContents = cssToExportedString(readResult);
  const newFileName = createNewFileExt(path, '.ts');
  const writeResult = save(newFileName, exportContents);
  if (writeResult.error) {
    return Promise.resolve(writeResult.error);
  }
  return Promise.resolve();
}

/**
 * Gets all files with glob, compares file names and creates importable contents
 */
async function cssToImportableString(args) {
  const { globPath, targetFiles, verbose } = args;
  let error;
  return new Promise(async (resolve, reject) => {
    const filesWithJs = await glob(globPath);
    for (const filePath of filesWithJs) {
      if (isMatchingFile(targetFiles, filePath)) {
        console.log('Copying file', filePath);
        if (!error) {
          error = await createNewFile(filePath);
        }
      } else if (verbose) {
        console.log('Ignoring file', filePath);
      }
    }
    error ? reject(error) : resolve();
  });
}

function argToObjectOrString(args) {
  let pendingArg = '';
  const argNameMap = {
    v: 'verbose',
    d: 'globPath',
    directory: 'globPath',
    t: 'targetFiles',
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
  if (result.targetFiles) {
    result.targetFiles = result.targetFiles
      .split(',')
      .map((path) => path.trim())
      .filter((path) => path.length > 4);
  }
  if (unknownArgs) {
    result.unknownArgs = unknownArgs;
  }
  return result;
}

cssToImportableString(argToObjectOrString(process.argv));
