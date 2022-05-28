import { Router } from "express";

import { getCategories, postCategories } from "../controllers/categoriesController.js";
import validateCategorie from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategorie, postCategories);

export default categoriesRouter;