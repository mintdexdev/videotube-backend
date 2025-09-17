import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username should be unique"],
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email should be unique"],
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
    trim: true,
    index: true,
  },
  avatar: {
    type: String, // cloudinary url
    required: [true, "Avatar is required"],
  },
  coverImage: {
    type: String, // cloudinary url

  },
  watchHistory: [
    {
      type: Schema.type.ObjectId,
      ref: "Video",
    }
  ],
  password: {
    type: String,
    required: [true, "password is required"],
  },
  refreshToken: {
    type: String,
  }
}, { timestamps: true })

userSchema.pre("saave", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10)
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPITY }
  )
}

export const User = mongoose.model("User", userSchema) 