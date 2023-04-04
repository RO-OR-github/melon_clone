import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  description: String,
  thumbnail: String,
  songview: Number,
});

const Song = mongoose.model("Song", songSchema);

export default Song;
