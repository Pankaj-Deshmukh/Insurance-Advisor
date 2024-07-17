const mongoose = require("mongoose");
const { User } = require("./index"); // replace with your actual file path

mongoose.connect("mongodb://localhost:27017/ps2");

const newUser = new User({
  email: "user@example.com",
  name: "John Doe",
  password: "securepassword",
  sessionData: new Map([
    ["firstSession", [
      {
        question: "What is the capital of France?",
        answer: "Paris",
        userId: new mongoose.Types.ObjectId(),
      },
      {
        question: "What is 2 + 2?",
        answer: "4",
        userId: new mongoose.Types.ObjectId(),
      },
    ]],
  ]),
});

console.log("New User:", JSON.stringify(newUser, null, 2));

newUser.save()
  .then(() => {
    console.log("User with session data saved!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
