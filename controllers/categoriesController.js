import db from "../db.js";

async function getCategories(req, res) {

    try {
        const categories = await db.query(`SELECT * FROM categories`);
        return res.send(categories.rows).status(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function postCategories(req, res) {
    const { name } = req.body;

    try {
        await db.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        return res.sendStatus(201);

    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro ao criar uma nova categoria!");
    }
}

export { getCategories, postCategories };