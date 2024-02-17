import getPrismaInstance from "../utils/PrismaClient.js";
import bcrypt from "bcrypt";

function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
          if (err) {
              reject(err);
          } else {
              resolve(hash);
          }
      });
  });
}

async function checkPassword(plainPassword, hashedPassword) {
  try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
  } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
  }
}
 
export const checkUser = async (request, response, next) => {
  try {
    var { eId, password } = request.body;
    if (!eId) {
      return response.json({ msg: "Employee ID is required", status: false });
    }
    const prisma = getPrismaInstance();
    const saltRounds = 10;
    const bcryptPassword = await hashPassword(password, saltRounds);

    const user = await prisma.user.findFirst({ where: { eId } });

    console.log("user in server ", user);
    if (!user) {
      return response.json({ msg: "User not found", status: false });
    } else if (!user.isActive) {
      return response.json({ msg: "User not found", status: false });
    } else {

      checkPassword(password, bcryptPassword)
    .then(match => {
        if (match) {
           return response.json({ msg: "User found", status: true, data: user });
        } else {
          return response.json({ msg: "Incorrect Passowrd", status: false });
        }
    });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (request, response, next) => {
  try {
    const { eId, name, about = "Available", image: profilePicture } = request.body;
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