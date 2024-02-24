import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import dotenv from "dotenv";
import fetchEmployeeData from "./fetchEmployeeData.js";

dotenv.config();
let prisma = null;
prisma = new PrismaClient();

const dbName = process.env.DATABASE_NAME;
const database = process.env.DATABASE;

async function checkDatabaseExists(databaseName) {
    try {
        const result = await prisma.$queryRaw`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ${databaseName}`;
        return result.length > 0;
    } catch (error) {
        console.error('Error checking database existence:', error);
        return false;
    }
}


export async function copyData() {
    try {

        const sourceDatabaseExists = await checkDatabaseExists(database);
        const targetDatabaseExists = await checkDatabaseExists(dbName);

        if (!sourceDatabaseExists || !targetDatabaseExists) {
            console.error('Source or target database does not exist');
            return;
        }

        console.log("Database Exists");

        const sourceData = await fetchEmployeeData();

        const existingUserData = await prisma.user.findMany();
        const nonDuplicateUsers = sourceData.filter(sourceUser => {
            return !existingUserData.some(existingUser => existingUser.eId === sourceUser.eId);
        });

        if (nonDuplicateUsers.length === 0) {
            console.log('No new users to copy.');
            return;
        }

        await prisma.User.createMany({
            data: nonDuplicateUsers
        });

        console.log('Data copied successfully');
    } catch (error) {
        console.error('Error copying data:', error);
    }
}

// async function  runCronJob(){
//   console.log('Running cron job...');
//   await copyData();
// }

// runCronJob();

// cron.schedule('0 10 * * *', async () => {
//     console.log('Running cron job...');
//     await copyData();
// }, {
//     timezone: 'Asia/Kolkata'
// });