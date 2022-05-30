import db from "../db.js";
import dayjs from "dayjs";
import moment from "moment";

async function getRentals(req, res) {
    const { customerId, gameId } = req.query

    try {

        if (customerId) {

            const result = await db.query(`
                SELECT * FROM rentals WHERE id = $1`,
                [customerId]);

            if (result.rows.length === 0) {
                return res.status(404).send("Usuário não encontrado!");
            } else {
                return res.send(result.rows).status(200);
            }

        } else if (gameId) {

            const result = await db.query(`
                SELECT * FROM rentals WHERE "gameId" = $1`,
                [gameId]);

            if (result.rows.length === 0) {
                return res.status(404).send("Jogo não encontrado!");
            } else {
                return res.send(result.rows).status(200);
            }

        } else {

            console.log("ENTROU")

            const result = await db.query(`
            SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" 
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON games."categoryId" = categories.id;
        `);

    console.log("ENTROU 2")

            let allRentals = result.rows;
            let rentalsObjects = [];

            for (let rental of allRentals) {
                rental = {
                    ...rental,
                    custumers: {
                        id: rental.customerId,
                        name: rental.customerName
                    },
                    game: {
                        id: rental.gameId,
                        name: rental.gameName,
                        categoryId: rental.categoryId,
                        categoryName: rental.categoryName
                    }
                }
                delete rental.customerName;
                delete rental.gameName;
                delete rental.categoryId;
                delete rental.categoryName;

                rentalsObjects.push(rental);
            }

            console.log("ENTROU 3")

            return res.send(rentalsObjects).status(200)
        }

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs(Date.now()).format("YYYY-MM-DD");

    const infoGames = await db.query(`
        SELECT * FROM games WHERE id = $1`,
        [gameId]);
    const originalPrice = daysRented * infoGames.rows[0].pricePerDay;

    try {

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
            VALUES ($1, $2, $3, $4, $5)`,
            [customerId, gameId, daysRented, rentDate, originalPrice]);

        return res.sendStatus(201);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function postFinishRental(req, res) {
    const { id } = req.params;

    try {

        const rental = await db.query(`
            SELECT * FROM rentals
            WHERE id = $1`,
            [id]);

        const rentDate = moment(dayjs(rental.rows[0].rentDate).format("YYYY-MM-DD"));
        const returnDate = moment(dayjs(Date.now()).format("YYYY-MM-DD"));

        const days = returnDate.diff(rentDate, 'day');
        const delayFee = days > 0 ? (rental.rows[0].originalPrice / rental.rows[0].daysRented) : 0;

        await db.query(`
            UPDATE rentals
            SET
            "returnDate" = $1,
            "delayFee" = $2
            WHERE id = $3`,
            [returnDate, delayFee, id]);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function deleteRentals(req, res) {
    const { id } = req.params;

    try {
        await db.query(`
            DELETE FROM rentals
            WHERE id = $1`,
            [id]);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export { getRentals, postRentals, postFinishRental, deleteRentals };