const regSer = require('../services/register');

const EV = require('express-validator');




const getPageRegister = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    });
};

const createNewUserReg = async (req, res) => {
    //validate required fields
    const errorsArr = [];
    const validationErrors = EV.validationResult(req);
    console.log(validationErrors.isEmpty());
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user
    console.log(req.body.designation);
    let newUser = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        pword: req.body.password,
        positionID: req.body.designation
    };
    try {
        await regSer.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        console.log(err);
        return res.redirect("/register");
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUserReg: createNewUserReg
};