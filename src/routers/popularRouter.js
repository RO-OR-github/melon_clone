import express from "express";
import { home } from "../controllers/songController";
import Song from "../models/Song";

const popularRouter = express.Router();

popularRouter.get("/", async (req, res) => {});

export default popularRouter;
