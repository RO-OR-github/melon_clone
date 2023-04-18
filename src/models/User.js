import mongoose from "mongoose";
import Song from "./Song";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  userPw: { type: String, required: true },
  playlist: [
    {
      videoId: String,
      title: String,
      description: String,
      thumbnail: String,
      songview: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
