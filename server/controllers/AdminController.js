import getPrismaInstance from "../utils/PrismaClient.js";

export const AdminGetAllUsers = async (req, res, next) => {
    try {
      const prisma = getPrismaInstance();
      const users = await prisma.user.findMany({
        orderBy: { name: "asc" },
        select: {
          eId: true,
          name: true,
          email: true,
        },
      });
      const usersGroupedByInitialLetter = {};
      users.forEach((user) => {
        const initialLetter = user.name.charAt(0).toUpperCase();
        if (!usersGroupedByInitialLetter[initialLetter]) {
          usersGroupedByInitialLetter[initialLetter] = [];
        }
        usersGroupedByInitialLetter[initialLetter].push(user);
      });
  
      return res.status(200).send({ users: usersGroupedByInitialLetter });
    } catch (error) {
      next(error);
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

export const deleteUser =  async (req, res) => {
    const userId = parseInt(req.params.id); // Extract the user ID from the request parameters
  
    try {
        const prisma = getPrismaInstance();

      // Delete the user from the database
      await prisma.user.delete({
        where: { id: userId }, // Specify the user to delete by ID
      });
  
      res.json({ message: 'User deleted successfully' }); // Send success message in the response
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };