const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: { type: Number },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: { type: String },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personScheme.pre("save", async function (next) {
  const person = this;

  // Hash the password only if modified or new
  if (!person.isModified("password")) return next();

  try {
    // hash password generate
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // override plain password with hash password
    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

personScheme.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Person = mongoose.model("Person", personScheme);
module.exports = Person;
