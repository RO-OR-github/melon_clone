import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(process.env.DB_URL);

const songSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  description: String,
  thumbnail: String,
  songview: Number,
});

const Song = mongoose.model("Song", songSchema);

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

app.get("/save-playlist", (req, res) => {
  const apiKey = "AIzaSyB1Kp4J50JImQqFVUWWYq3quWGDMC1DTD8";
  const playlistId = "PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m";

  youtube.playlistItems.list(
    {
      key: apiKey,
      part: "snippet",
      playlistId: playlistId,
      maxResults: 100,
    },
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving playlist");
      } else {
        const playlistItems = data.data.items;

        playlistItems.forEach((item) => {
          const playlistItem = new Song({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
            songview: 0,
          });

          playlistItem.save();
        });

        res.send("Playlist saved to MongoDB");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
