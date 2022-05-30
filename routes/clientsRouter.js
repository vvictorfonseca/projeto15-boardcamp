import { Router } from "express";

import { getAllClients, getClient, postNewClient, updateClient } from "../controllers/clientsController.js";
import { validateId, validateBody } from "../middlewares/clientsMiddleware.js";

const clientsRouter = Router();

clientsRouter.get("/customers", getAllClients);
clientsRouter.get("/customers/:id", validateId, getClient);
clientsRouter.post("/customers", validateBody, postNewClient);
clientsRouter.put("/customers/:id", validateBody, updateClient);

export default clientsRouter;
