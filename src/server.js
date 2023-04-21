import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import popularRouter from "./routers/popularRouter";
import updateRouter from "./routers/updateRouter";
import loginRouter from "./routers/loginRouter";
import myplayRouter from "./routers/myplayRouter";
import User from "./models/User";
import Song from "./models/Song";

const app = express();
const logger = morgan("dev");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(express.static("assets"));
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(
  "https://port-0-melon-clone-e9btb72blgort9sn.sel3.cloudtype.app/",
  rootRouter
);
/*
Add more routers here!
*/
app.use("/popular", popularRouter);
app.use("/update", updateRouter);
app.use("/login", loginRouter);
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
let isLoding = false;
app.post("/playlist", async (req, res) => {
  if (!isLoding) {
    isLoding = true;
    const song = await req.body.songid;
    const user = await req.body.userid;
    const songData = await Song.findOne({ videoId: song });
    const data = await User.findOne({
      playlist: { $elemMatch: { videoId: song } },
    });

    if (data) {
      User.findOneAndUpdate(
        { userId: data.userId },
        { $pull: { playlist: { videoId: song } } },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            console.error(err);
          } else {
            console.log(updatedUser);
          }
        }
      );
    } else {
      const videoInfo = {
        videoId: songData.videoId,
        title: songData.title,
        description: songData.description,
        thumbnail: songData.thumbnail,
        songview: songData.songview,
      };

      User.findOneAndUpdate(
        { userId: user },
        { $push: { playlist: videoInfo } },
        { new: true },
        (err, updatedUser) => {
          if (err) {
            console.error(err);
          } else {
            console.log(updatedUser);
          }
        }
      );
    }

    isLoding = false;
    res.redirect("/");
  }
});

app.use("/playlist", myplayRouter);
export default app;
