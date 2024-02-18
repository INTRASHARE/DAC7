import getPrismaInstance from "../utils/PrismaClient.js";
import bcrypt from 'bcryptjs';

function hashPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        console.error(err);
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        })
      }
    })
  });
} 

async function checkPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashedPassword, function(err, isMatch) {
        if (err) {
          reject(err); // Reject the promise with the error
        } else {
          resolve(isMatch); // Resolve the promise with the result
        }
      });
    });

    if (!isMatch) {
      console.log("Password doesn't match!");
      return isMatch
    }

    console.log("Password matches!");
    return isMatch; // Return the result if passwords match
  } catch (error) {
    console.error(error);
  }
}

 
export const checkUser = async (request, response, next) => {
  try {
    var { eId, password } = request.body;
    console.log(eId, password, "eId, password");
    if (!eId) {
      return response.json({ msg: "Employee ID is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findFirst({ where: { eId } });

    console.log("user in server ", user);
    if (!user) {
      return response.json({ msg: "User not found", status: false });
    } else if (!user.isActive) {
      return response.json({ msg: "User not found", status: false });
    } else {

      console.log("password, bcryptPassword", password, user.password);

      checkPassword(password, user.password)
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
    var { eId, name, about = "Available", image: profilePicture, password } = request.body;
    const prisma = getPrismaInstance();

    console.log("password",password);
    const saltRounds = 10;
    const bcryptPassword = await hashPassword(password, saltRounds);

    console.log(bcryptPassword);
    
    console.log(request.body);
    await prisma.user.update({
      where: { eId: eId },
      data: { name, about, profilePicture, onBoarding: 1, password: bcryptPassword }
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