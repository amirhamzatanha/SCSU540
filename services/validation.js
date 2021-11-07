//import { check } from "express-validator";
const validator = require('express-validator');


let validateRegister = [
    validator.check("email", "Invalid email").isEmail().trim(),

    validator.check("password", "Invalid password. Password must be at least 2 chars long")
    .isLength({ min: 2 }),

    validator.check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    })
];

let validateLogin = [
    validator.check("email", "Invalid email").isEmail().trim(),

    validator.check("password", "Invalid password")
    .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};