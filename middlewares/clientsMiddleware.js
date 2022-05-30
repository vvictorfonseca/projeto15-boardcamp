import db from "../db.js";

import clientSchema from "../schemas/clientsSchema.js"

async function validateId(req, res, next) {
    const { id } = req.params

    try {

        const clientExist = await db.query(`
            SELECT * FROM customers
            WHERE id = $1`,
            [id])

        if (!clientExist.rows[0]) {
            return res.send("Cliente não encontrado").status(404);
        }

        next()
    
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function validateBody(req, res, next) {
    const { name, phone, cpf, birthday } = req.body

    const { error } = clientSchema.validate(req.body, { abortEarly: false })

    if (error) {
        return res.status(400).send(error.details.map((error) => error.message))
    }

    try {

        const cpfExist = await db.query(`
            SELECT * FROM customers
            WHERE cpf = $1`,
            [cpf])

        if (cpfExist.rows[0]) {
            return res.status(409).send("CPF já em uso")
        }

        next()
    
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export { validateId, validateBody};