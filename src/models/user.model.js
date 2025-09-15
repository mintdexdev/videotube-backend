import mongoose, { Schema } from 'mongoose';

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
  fullname: {
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

export const User = mongoose.model("User", userSchema) 