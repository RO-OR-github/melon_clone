import express from "express";

import { myplay } from "../controllers/userController";

const loginRouter = express.Router();
let isLoding = false;
loginRouter.route("/").get(myplay);

export default loginRouter;
