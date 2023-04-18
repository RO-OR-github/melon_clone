import User from "../models/User";

export const login = async (req, res) => {
  const users = await User.find({});

  return res.render("login", { pageTitle: "login", data: users });
};

export const myplay = async (req, res) => {
  let user = null;
  if (req.session.user) {
    user = await User.find({ _id: req.session.user._id });
  }

  return res.render("myplay", {
    pageTitle: "playlist",
    data: user[0].playlist,
    userData: user[0],
  });
};
