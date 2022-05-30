import dotenv from "dotenv";
import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";

import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import clientsRouter from "./routes/clientsRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

dotenv.config()

const app = express();
app.use(cors());
app.use(json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(clientsRouter);
app.use(rentalsRouter);

app.listen( process.env.PORT, () => {
    console.log(chalk.bold.green(`Server is good to go on ${process.env.PORT}`))
});

