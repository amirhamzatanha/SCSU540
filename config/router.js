const express = require('express');
const homepagecontroller = require('../control/homePageControl');
const registerController = require('../control/registerControl');
const loginController = require('../control/loginControl');
const auth = require('../services/validation');
const passport= require('passport');
const initPassportLocal= require('../control/passportLocalController');


// Init all passport
initPassportLocal();
let router = express.Router();

let initWebRoutes =async(app) => {
    router.get("/", loginController.checkLoggedIn, homepagecontroller.handleIndex);
    router.get("/users", loginController.checkLoggedIn, homepagecontroller.handleViewUsers);
    router.get("/edituser/:id", loginController.checkLoggedIn, homepagecontroller.handleEditUsers);

    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", loginController.checkLoggedOut,registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUserReg);
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
 
};
module.exports = initWebRoutes;