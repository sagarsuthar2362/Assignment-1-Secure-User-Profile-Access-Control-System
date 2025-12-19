import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { encrypt, decrypt } from "../utils/encrypt.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  const { name, email, password, aadhaar } = req.body;

  //validating the fields making sure not to be empty
  if (!name || !email || !password || !aadhaar) {
    throw { status: 400, message: "fields cannot be empty" };
  }
  const UserAlreadyExists = await User.findOne({ email });
  if (UserAlreadyExists) {
    throw { status: 400, message: "user already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    aadhaar: encrypt(aadhaar),
  });
  const token = generateToken(newUser._id);
  res.cookie("token", token, {
    secure: true,
    maxAge: 60 * 60 * 1000,
  });
  res.status(201).json({ message: "user created succesfully", newUser, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw { status: 400, message: "fields cannot be empty" };
  }
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw { status: 404, message: "user does not exist" };
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordCorrect) {
    throw { status: 401, message: "Invalid credentials" };
  }
  const token = generateToken(isUserExist._id);
  res.cookie("token", token, {
    maxAge: 60 * 60 * 1000,
    secure: true,
  });
  res.status(200).json({ message: "user logged in succesfully", token });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({
    user,
    aadhaar: decrypt(user.aadhaar),
  });
};
