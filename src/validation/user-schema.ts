import joi from "joi"


export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()

})

export const addUserSchema = joi.object({
    name:joi.string().required(),
     email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    username: joi.string().required(),
    age: joi.number().required(),
    address: joi.string().required()
})