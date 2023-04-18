import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  const songs = await Song.find({}).sort({ songview: "desc" });
  let user = {};
  if (req.session.user) {
    user = await User.find({ _id: req.session.user._id });
  }

  return res.render("home", {
    pageTitle: "Home",
    data: songs,
    userData: user[0],
  });
};
