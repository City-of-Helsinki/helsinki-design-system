const fs = require('fs');

const chalk = require('chalk');
const inquirer = require('inquirer');

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

const addExports = (name) => {
  const exportString = `export * from './${name}';\n`;
  try {
    fs.appendFileSync('src/components/index.ts', exportString, 'utf-8');
  } catch (error) {
    exitError(`Failed to add export to index.ts: ${error}`);
  }

  return exportString;
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

  const exportString = addExports(nameCamel);
  logStep(`${chalk.bold(`Added export to src/components/index.ts:`)}\n\t${chalk.italic(exportString)}`);

  logStep(
    `${chalk.bold(`Scaffolding done.`)} Run ${chalk.yellow.italic('yarn start')} to see your component in Storybook!`,
  );
};

scaffold();
