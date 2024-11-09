import mongoose from "mongoose";
import bcryptjs from "bcryptjs"
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.isPasswordCorrect=async function (password) {
  return  bcryptjs.compare(password,this.password)
}
const User = mongoose.model("User", userSchema);

 export default User;
