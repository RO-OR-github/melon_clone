import express from "express";
import Song from "../models/Song";

const updateRouter = express.Router();
let isLoding = false;
updateRouter.post("/", async (req, res) => {
  if (!isLoding) {
    isLoding = true;
    const id = await req.body;
    const data = await Song.findOne({ videoId: id.songid });
    data.songview += 1;
    await data.save();
    console.log(data.songview);
    isLoding = false;
    res.json({ songview: data.songview });
  }
});

export default updateRouter;
