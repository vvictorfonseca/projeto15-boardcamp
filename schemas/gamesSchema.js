import joi from "joi";

const postGamesSchema = joi.object(
    {
        name: joi.string().min(3).required(),
        image: joi.string().required(),
        stockTotal: joi.number().integer().min(1),
        categoryId: joi.number().integer().min(1),
        pricePerDay: joi.number().integer().min(1)
    }
)

export default postGamesSchema;