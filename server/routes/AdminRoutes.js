import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route handler to fetch all users
router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route handler to update a user
router.put('/api/admin/updateUser/:id', async (req, res) => {
  const userId = parseInt(req.params.id); // Extract the user ID from the request parameters
  const userData = req.body; // Extract the updated user data from the request body

  try {
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
});

// Route handler to delete a user
router.delete('/api/admin/deleteUser/:id', async (req, res) => {
  const userId = parseInt(req.params.id); // Extract the user ID from the request parameters

  try {
    // Delete the user from the database
    await prisma.user.delete({
      where: { id: userId }, // Specify the user to delete by ID
    });

    res.json({ message: 'User deleted successfully' }); // Send success message in the response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
