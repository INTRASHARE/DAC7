import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import path from 'path';

async function setup() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Navigate to the server directory and install dependencies
    await installDependencies(path.join(__dirname, '../'));

    // Navigate to the client directory and install dependencies
    await installDependencies(path.join(__dirname, '../../client'));

    // Run linting for the client
    await runLinting(path.join(__dirname, '../../client'));

    console.log('Setup completed successfully.');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

async function installDependencies(directory) {
  return new Promise((resolve, reject) => {
    exec(`cd ${directory} && npm install`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing dependencies in ${directory}: ${error}`);
        return;
      }
      console.log(`Dependencies installed in ${directory}: ${stdout}`);
      resolve();
    });
  });
}

async function runLinting(directory) {
  return new Promise((resolve, reject) => {
    exec(`cd ${directory} && npm run lint`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error while linting in ${directory}: ${error}`);
        return;
      }
      console.log(`Linting complete in ${directory}: ${stdout}`);
      resolve();
    });
  });
}

setup();
