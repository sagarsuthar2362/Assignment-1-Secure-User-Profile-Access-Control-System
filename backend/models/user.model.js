import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
