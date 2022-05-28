import db from "../db.js";

async function getGames(req, res) {
    const { name } = req.query;

    try {

        if (!name) {
            const games = await db.query(`
            
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id`);

            return res.send(games.rows).status(200);
        
        } else {
            const nameUpperCase = name.charAt(0).toUpperCase()+name.slice(1);
            const games = await db.query(`
            
            SELECT games.*, categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId" = categories.id
            WHERE (games.name LIKE $1 OR games.name LIKE $2)`
            , [`${name}%`, `${nameUpperCase}%`]);

            return res.send(games.rows).status(200);
        }

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {

        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);

        return res.sendStatus(201);

    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro ao registrar um novo jogo!");
    }
}

export { getGames, postGames };