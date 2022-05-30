import db from "../db.js";

async function getAllClients(req, res) {
    const { cpf } = req.query;

    try {

        if (!cpf) {
            const allClients = await db.query(`
                SELECT * FROM  customers`);

            return res.send(allClients.rows).status(200);

        } else {
            const filteredCpf = await db.query(`
                SELECT * FROM customers
                WHERE cpf LIKE $1`,
                [`${cpf}%`]);

            return res.send(filteredCpf.rows).send(200);
        }

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function getClient(req, res) {
    const { id } = req.params

    try {

        const client = await db.query(`
            SELECT * FROM customers
            WHERE ID = $1`,
            [id]);

        return res.send(client.rows[0]).status(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function postNewClient(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {

        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]);

        return res.sendStatus(201);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

async function updateClient(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {

        await db.query(`
            UPDATE customers
            SET
            name = $1,
            phone = $2,
            cpf = $3,
            birthday = $4
            WHERE id = $5`,
            [name, phone, cpf, birthday, id]);

        return res.sendStatus(200);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export { getAllClients, getClient, postNewClient, updateClient };