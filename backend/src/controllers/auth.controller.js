import User from "../models/user.model.js";
export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Some fields are missing!" });
  }
  if ([username, email, password].some((field) => field.trim() === "")) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const newUser = await User.create({
    username: username,
    email: email,
    password: password,
  });
  if (!newUser) {
    return res
      .status(400)
      .json({ message: "Error while registering the user!" });
  }
  return res.status(200).json({ message: "User registered successfully!" });
};
