import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../model/users.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credential" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.TEST_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmedPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });
    if (password !== confirmedPassword)
      return res.status(400).json({ message: "password don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Users.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TEST_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
