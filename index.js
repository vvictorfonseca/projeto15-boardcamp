import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

dotenv.config()

const app = express();
app.use(cors());
app.use(json());

app.listen( process.env.PORT, () => {
    console.log(chalk.bold.green(`Server is good to go on ${process.env.PORT}`))
});

