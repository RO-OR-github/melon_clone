import Song from "../models/Song";

export const home = async (req, res) => {
  const songs = await Song.find({}).sort({ songview: "desc" });

  return res.render("home", { pageTitle: "Home", data: songs });
};
