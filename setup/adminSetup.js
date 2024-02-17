import { PrismaClient } from "@prisma/client";
import fs from "fs";

export const adminInfoSetup = async (eId, password) => {
  try {
    // Connect to the Prisma client
    const prisma = new PrismaClient();

    // Check if admin details already exist
    const admin = await prisma.user.findUnique({ where: { eId } });
    if (!admin) {
      console.log('Invalid Employee ID');
      // Ask for admin credentials again
    } else {
      const credentials = { eId, password };
      fs.writeFileSync('credentials.json', JSON.stringify(credentials));
      console.log('Credentials saved successfully.');
      console.log('Admin Created');
    }

    // Disconnect from the Prisma client
    await prisma.$disconnect();
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

