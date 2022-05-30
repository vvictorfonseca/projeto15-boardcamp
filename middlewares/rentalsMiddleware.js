import db from "../db.js";

async function validateRentalsPost(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    try {

        const customerExist = await db.query(`
            SELECT * FROM customers
            WHERE id = $1`,
            [customerId]);

        const gameExist = await db.query(`
            SELECT * FROM games
            WHERE id = $1`,
            [gameId]);

        if (!gameExist.rows[0] || !customerExist.rows[0]) {
            return res.status(400).send("Jogo ou usuário inexistente!");
        }

        if (daysRented == 0 || daysRented == null) {
            return res.status(400).send("valor inválido nos dias de aluguel!")
        }

        const rentals = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`,[gameId]);

        const filteredRentals = rentals.rows.filter(rental => rental.returnDate === null)

        if (filteredRentals.length >= gameExist.rows[0].stockTotal) {
            return res.status(400).send("Todos os jogos estão alugados!")
        }

        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function validateFinishRental(req, res, next) {
    const { id } = req.params;

    try {

        const idExist = await db.query(`
            SELECT * FROM rentals
            WHERE id = $1`,
            [id]);

        if (!idExist.rows[0]) {
            return res.status(404).send("ID inexistente!")
        }

        if(idExist.rows[0].returnDate != null) {
            return res.status(400).send("Aluguel já finalizado!");
        }

        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function validateRentalsDelete(req, res, next) {
    const { id } = req.params;

    try {

        const idExist = await db.query(`
            SELECT * FROM rentals
            WHERE id = $1`,
            [id]);

        if (!idExist.rows[0]) {
            return res.status(404).send("Reserva inexistente!");
        }

        if(idExist.rows[0].returnDate != null) {
            return res.status(400).send("Aluguel já finalizado!");
        }

        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export { validateRentalsDelete, validateRentalsPost, validateFinishRental };