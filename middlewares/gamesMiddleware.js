import db from "../db.js";

import postGamesSchema from "../schemas/gamesSchema.js"

async function validatePostGames(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    const { error } = postGamesSchema.validate(req.body, { abortEarly: false })

    if (error) {
        return res.status(422).send(error.details.map((error) => error.message))
    }

    try {
        const idCategory = await db.query(`
            SELECT * FROM categories
            WHERE id = $1`,
            [categoryId]);

        if (!idCategory.rows[0]) {
            return res.status(400).send("Essa categoria não consta em nosso catálogo!");
        }

        const nameExist = await db.query(`
            SELECT * FROM games
            WHERE name = $1`,
            [name]);

        if (nameExist.rows[0]) {
            return res.status(409).send("Nome de jogo já existente!");
        }

        next()

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export default validatePostGames;