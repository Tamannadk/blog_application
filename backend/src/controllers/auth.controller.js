import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Some fields are missing!" });
  }
  if ([username, email, password].some((field) => field.trim() === "")) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //find user in the database first if the user is already logged in then no need to create again
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res
        .status(400)
        .json({ message: "Error while registering the user!" });
    }
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
