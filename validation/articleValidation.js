const Joi = require("joi")

const articleSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
})

module.exports = articleSchema