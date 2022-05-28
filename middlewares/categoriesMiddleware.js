import db from "../db.js";

async function validateCategorie(req, res, next){
    const {name} = req.body;

    if (!name) {
        return res.sendStatus(400);
    }

    try{
        const categorieExist = await db.query(`SELECT name FROM categories WHERE name= $1`, [name]);
        if(categorieExist.rows[0]){
            return res.sendStatus(409);
        }

        next()
    
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export default validateCategorie;