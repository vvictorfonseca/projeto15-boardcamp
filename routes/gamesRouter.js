import { Router } from "express";

import { getGames, postGames } from "../controllers/gamesController.js"
import validatePostGames from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validatePostGames, postGames);

export default gamesRouter;