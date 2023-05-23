/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const chalk = require('chalk');
const inquirer = require('inquirer');
const prettier = require('prettier');

const esmInput = require('../config/esmInput');

const exitError = (msg) => {
  console.log(`${chalk.red.bold('Error:')} ${chalk.italic(msg)}`);
  process.exit(1);
};

const logStep = (msg) => console.log(`${chalk.green('✓')} ${msg}`);

const createFolder = (path) => {
  if (fs.existsSync(path)) {
    exitError(`component already exists in ${path}!`);
  }

  fs.mkdirSync(path);
  return path;
};

const createComponentFiles = (templatePath, destination, name) => {
  const nameLower = name.toLowerCase();
  const nameCapital = `${name[0].toUpperCase()}${name.slice(1)}`;
  const nameCamel = `${name[0].toLowerCase()}${name.slice(1)}`;

  const files = fs.readdirSync(templatePath);

  const newFiles = files.map((file) => {
    const sourcePath = `${templatePath}${file}`;
    const targetPath = `${destination}/${file
      .split('NewComponent')
      .join(nameCapital)
      .split('new-component')
      .join(nameLower)}`;

    const data = fs
      .readFileSync(sourcePath, 'utf-8')
      .split('[-replace-name-capital-]')
      .join(nameCapital)
      .split('[-replace-name-camel-]')
      .join(nameCamel);

    fs.writeFileSync(targetPath, data);
    return targetPath;
  });

  return newFiles;
};

const addExports = (targetPath, string) => {
  try {
    const newExports = fs.readFileSync(targetPath, 'utf-8').split(';\n').filter(Boolean);

    newExports.push(string);

    const sortedExports = `${newExports.sort().join(';\n')};\n`;

    fs.writeFileSync(targetPath, sortedExports);
  } catch (error) {
    exitError(`Failed to add export to ${targetPath}: ${error}`);
  }

  return string;
};

const addReactExports = (name) => {
  const targetPath = 'src/components/index.ts';
  const exportString = `export * from './${name}'`;

  return addExports(targetPath, exportString);
};

const addCoreImports = (name) => {
  const targetPath = '../core/src/components/all.css';
  const exportString = `@import url("./${name}/${name}.css")`;

  return addExports(targetPath, exportString);
};

const addESMInputs = (name, files) => {
  try {
    const indexPath = files.find((file) => file.indexOf('index.ts') >= 1);
    const targetPath = 'config/esmInput.js';
    const newConfig = esmInput;
    const key = `components/${name}/index`;

    newConfig[key] = indexPath;

    const sortedConfig = Object.fromEntries(Object.entries(newConfig).sort());
    const exportString = `const esmInput = ${JSON.stringify(sortedConfig)};\nmodule.exports = esmInput;`;

    prettier
      .resolveConfigFile(indexPath)
      .then((config) => prettier.resolveConfig(config))
      .then((options) => {
        const formatted = prettier.format(exportString, { ...options, parser: 'babel' });

        fs.writeFileSync(targetPath, formatted);
      });
  } catch (error) {
    exitError(`Failed to add to esmInput.js: ${error}`);
  }
};

const createCoreComponentFiles = (templatePath, destination, name) => {
  const files = fs.readdirSync(templatePath);
  const nameHyphens = name.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());

  const newFiles = files.map((file) => {
    const sourcePath = `${templatePath}${file}`;
    const targetPath = `${destination}/${file.split('new-component').join(nameHyphens)}`;

    const data = fs
      .readFileSync(sourcePath, 'utf-8')
      .split('[-replace-name-capital-]')
      .join(name)
      .split('[-replace-name-hyphens-]')
      .join(nameHyphens);

    fs.writeFileSync(targetPath, data);
    return targetPath;
  });

  return newFiles;
};

const scaffoldCore = async (name) => {
  const nameCamel = `${name[0].toLowerCase()}${name.slice(1)}`;
  const nameHyphens = nameCamel.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());

  const path = createFolder(`../core/src/components/${nameHyphens}`);
  logStep(`${chalk.bold(`Created folder:`)}\n\t${chalk.italic(path)}`);

  const files = createCoreComponentFiles('../core/.templates/new-component/', path, name);
  logStep(`${chalk.bold(`Created files:`)}\n\t${chalk.italic(files.join('\n\t'))}`);

  const exportString = addCoreImports(nameHyphens);
  logStep(`${chalk.bold(`Added export to core/src/components/all.css:`)}\n\t${chalk.italic(exportString)}`);
};

const scaffold = async () => {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: `What's the name of your component? (e.g. TestComponent)`,
    validate: (input) => (input.split(' ').length < 2 ? true : `Invalid component name: ${input}`),
  });
  const nameCamel = `${name[0].toLowerCase()}${name.slice(1)}`;

  const path = createFolder(`src/components/${nameCamel}`);
  logStep(`${chalk.bold(`Created folder:`)}\n\t${chalk.italic(path)}`);

  const files = createComponentFiles('.templates/new-component/', path, name);
  logStep(`${chalk.bold(`Created files:`)}\n\t${chalk.italic(files.join('\n\t'))}`);

  const exportString = addReactExports(nameCamel);
  logStep(`${chalk.bold(`Added export to src/components/index.ts:`)}\n\t${chalk.italic(exportString)}`);

  addESMInputs(name, files);
  logStep(`${chalk.bold(`Added input to rollup.config.js:`)}`);

  const { createCoreComponent } = await inquirer.prompt({
    type: 'confirm',
    name: 'createCoreComponent',
    message: 'Would you like to create a core component?',
  });

  if (createCoreComponent) {
    await scaffoldCore(name);
  }

  logStep(
    `${chalk.bold(`Scaffolding done.`)} Run ${chalk.yellow.italic('yarn start')} to see your component in Storybook!`,
  );
};

scaffold();
