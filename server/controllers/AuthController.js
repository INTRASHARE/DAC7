import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (request, response, next) => {
    try {
        const { eId, password } = request.body;
        console.log("request bodu at checkuser server", request.body);
        if (!eId) {
            return response.json({ msg: "Employee ID is required", status: false });
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findFirst({ where: { eId, password } });

        if (!user) {
            return response.json({ msg: "User not found", status: false });
        } else {
            return response.json({ msg: "User found", status: true, data: user });
        }
    } catch (error) {
        next(error);
    }
};

export const onBoardUser = async (request, response, next) => {
    try {
        const { eId, name, about = "Available", image:profilePicture } = request.body;
        const prisma = getPrismaInstance();

        console.log(request.body);
        await prisma.user.update({
            where: { eId: eId },
            data: { name, about, profilePicture, onBoarding: 1 }
        });

        return response.json({ msg: "Success", status: true });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
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

// Route handler to update a user
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const prisma = getPrismaInstance();
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: userData,
        });

        return res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Route handler to delete a user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const prisma = getPrismaInstance();
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
