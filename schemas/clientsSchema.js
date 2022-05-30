import joi from "joi";

const regex  = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

const clientSchema = joi.object(
    {
        name: joi.string().min(3).required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().min(11).max(11).required(),
        birthday: joi.string().required().pattern(regex)
    }
)

export default clientSchema;