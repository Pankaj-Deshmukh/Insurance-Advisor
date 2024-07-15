const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017")
// Define the Question schema
const questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Define the User schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  totalQues: { type: Number, default: 0 },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create models from the schemas
const User = mongoose.model("User", userSchema);
const Question = mongoose.model("Question", questionSchema);

module.exports = { User, Question };
