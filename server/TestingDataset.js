import faker from "faker";
import fs from "fs";

const generateUsers = (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const user = {
      eId: i.toString(),
      password: i.toString(),
      email: faker.internet.email(),
      name: faker.name.findName(),
      profilePicture: "",
      about: faker.lorem.sentence(),
    };

    users.push(user);

  }

  return users;
};

const users = generateUsers(500);
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated 500 users.');
