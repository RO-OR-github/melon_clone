import express from "express";
import { home } from "../controllers/songController";
import Song from "../models/Song";

const updateRouter = express.Router();
let isLoding = false;
updateRouter.post(
  "/",
  async (req, res) => {
    if (!isLoding) {
      isLoding = true;
      const id = await req.body;
      const data = await Song.findById(id.songid);
      data.songview += 1;
      await data.save();
      console.log(data.songview);
      isLoding = false;
    }
  },
  home
);

export default updateRouter;
