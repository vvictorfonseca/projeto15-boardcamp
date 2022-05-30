import { Router } from "express";

import { getRentals, postRentals, postFinishRental, deleteRentals } from "../controllers/rentalsController.js";
import { validateRentalsDelete, validateRentalsPost, validateFinishRental } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRentalsPost, postRentals);
rentalsRouter.post("/rentals/:id/return", validateFinishRental, postFinishRental);
rentalsRouter.delete("/rentals/:id",validateRentalsDelete ,deleteRentals);

export default rentalsRouter;
