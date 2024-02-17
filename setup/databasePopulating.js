import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";
import fetchEmployeeData from "./fetchEmployeeData.js";

dotenv.config();
let prisma = null;
prisma = new PrismaClient();
const database = "intrashare";

export const dbSetup = async (dbName, tableName) => {
  try {
    // Connect to the Prisma client
    async function checkDatabaseExists(dbName) {
      try {
        const result = await prisma.$queryRaw`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ${dbName}`;
        return result.length > 0;
      } catch (error) {
        console.error('Error checking database existence:', error);
        return false;
      }
    }
    if (!checkDatabaseExists()) {
      console.log('Invalid Database name');
      // Ask for admin credentials again
      dbSetup();
    } else {
      async function copyData() {
        try {

          const sourceDatabaseExists = await checkDatabaseExists(database);
          const targetDatabaseExists = await checkDatabaseExists(dbName);

          if (!sourceDatabaseExists || !targetDatabaseExists) {
            console.error('Source or target database does not exist');
            return;
          }

          console.log("Database Exists");

          const sourceData = await fetchEmployeeData(dbName, tableName);

          await prisma.User.createMany({
            data: sourceData
          });

          console.log('Data copied successfully');
        } catch (error) {
          console.error('Error copying data:', error);
        }
      }

      copyData();
    }

    // Disconnect from the Prisma client
    await prisma.$disconnect();
  } catch (error) {
    console.error('Setup failed:', error);
  }
}