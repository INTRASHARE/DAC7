import faker from "faker";
import fs from "fs";

const generateUsers = (count) => {

  const users = [];

  for (let i = 1; i <= count; i++) {
    const user = {
      eId: i.toString(),
      password: "$2b$10$IPKfd5sD2qT2.HrfqC0EPuchQ4aJboIPYCVEro54KbGYl.TGLgZMm",
      email: faker.internet.email(),
      name: faker.name.findName(),
      profilePicture: "/default_avatar.png",
      about: "available",
    };

    users.push(user);

  }

  return users;
};

const users = generateUsers(500);
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated 500 users.');
