import express from "express";
import User from "../models/User";
import { login } from "../controllers/userController";

const loginRouter = express.Router();
let isLoding = false;
loginRouter
  .route("/")
  .get(login)
  .post(async (req, res, next) => {
    if (!isLoding) {
      isLoding = true;
      const login = await req.body;
      const user = await User.findOne({ userId: login.id });
      if (!user) {
        res.json({ loginResult: false, message: "다시 입력하세요." });
      } else {
        if (user.userPw == login.pw && user.userId == login.id) {
          req.session.loggedIn = true;
          req.session.user = user;
          next();
          res.redirect("/");
        } else {
          res.json({ loginResult: false, message: "다시 입력하세요.2" });
        }
      }
      isLoding = false;
    }
  });

export default loginRouter;
