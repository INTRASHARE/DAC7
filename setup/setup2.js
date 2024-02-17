import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import path from 'path';
import readline from "readline";
import {dbSetup} from "./databasePopulating.js";
import {adminInfoSetup} from "./adminSetup.js";
import { PrismaClient } from '@prisma/client';

let prisma = null;
prisma = new PrismaClient();

async function setup2() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Generate and push the database using Prisma
    // await executeCommand(`cd ${path.join(__dirname, '../')} && npx prisma generate && npx prisma db push`);

    // Populate the database
    await databasePopulatingSetup();
    
    // Set up admin
    await adminSetup();

    // Start the server
    await executeCommand(`cd ${path.join(__dirname, '../')} && npm start`);

    // Start the client server
    await executeCommand(`cd ${path.join(__dirname, '../../client')} && npm run dev`);

    console.log('Setup completed successfully.');
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command '${command}': ${error}`);
        return;
      }
      console.log(`Command '${command}' executed successfully: ${stdout}`);
      resolve();
    });
  });
}

async function databasePopulatingSetup() {
  try {
    // Read inputs from command line
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let dbName, tableName;
    await new Promise((resolve) => {
      rl.question('Enter Employee Database name: ', async (i1) => {
        dbName = i1;
        rl.question('Enter table name: ', (i2) => {
          tableName = i2;
        rl.close();
        resolve();
      });
    });
    });

    // Execute the command with inputs
    await dbSetup(dbName, tableName);
    
  } catch (error) {
    console.error('Database populating setup failed:', error);
  }
}

async function adminSetup() {
  try {
    // Read inputs from command line
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let eId, password;
    await new Promise((resolve) => {
      rl.question('Enter admin employee ID: ', (i1) => {
        eId=i1;
        rl.question('Enter password: ', (i2) => {
          password=i2;
          rl.close();
        resolve();
      });
    });
    });
    await adminInfoSetup(eId, password);

  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setup2();
