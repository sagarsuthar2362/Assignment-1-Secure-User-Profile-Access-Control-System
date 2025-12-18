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
  res.status(201).json({ message: "user created succesfully", newUser , token});
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw { status: 400, message: "fields cannot be empty" };
  } else {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return { throw: 401, message: "invalid credentials" };
    else {
      const token = generateToken(user._id);
      res.cookie("token", token, {
        secure: true,
      });
      res.status(200).json({ message: "user can login", token });
    }
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    name: user.name,
    email: user.email,
    aadhaar: decrypt(user.aadhaar),
  });
};
