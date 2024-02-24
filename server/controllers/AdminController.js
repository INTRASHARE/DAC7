import getPrismaInstance from "../utils/PrismaClient.js";
import { copyData } from '../cronjob.js';

export const AdminGetAllUsers = async (req, res) => {
  try {
    const prisma = getPrismaInstance();

   const users = await prisma.user.findMany({
    where: {
      isActive: 1
    }
   });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id); // Extract the user ID from the request parameters
  const userData = req.body; // Extract the updated user data from the request body

  try {
    const prisma = getPrismaInstance();

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Specify the user to update by ID
      data: userData, // Provide the updated user data
    });

    res.json(updatedUser); // Send the updated user data in the response
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id); // Extract the user ID from the request parameters

  try {
    const prisma = getPrismaInstance();

    await prisma.$executeRaw`update user SET isActive = 0 WHERE eId = ${userId}`;

    res.json({ message: 'User deleted successfully' }); // Send success message in the response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cronUser = async (req, res) => {
  try {
      console.log('Running cron job...');
      await copyData(); // Execute the cron job
      res.status(200).send('Cron job executed successfully');
  } catch (error) {
      console.error('Error running cron job:', error);
      res.status(500).send('Internal server error');
  }
};