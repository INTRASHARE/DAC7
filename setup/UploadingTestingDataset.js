import { PrismaClient } from "@prisma/client";
import fs from "fs";

let prisma = null;
prisma = new PrismaClient();

async function seedData() {
  try {
    // Read the JSON file containing data
    const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    // Insert data into the database using Prisma Client
    await prisma.User.createMany({
      data: jsonData,
    });

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

seedData();
