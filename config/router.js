const express = require('express');
const homepagecontroller = require('../control/handlePages');
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
    router.post("/showUser/:id", loginController.checkLoggedIn, homepagecontroller.handleEditUser);
    router.post("/deleteUser/:id", loginController.checkLoggedIn, homepagecontroller.handleDeleteUser);
    router.post("/updateUser", loginController.checkLoggedIn, homepagecontroller.updateUser);

    router.get("/inventory", loginController.checkLoggedIn, homepagecontroller.handleInventory); 
    router.post("/deptName", loginController.checkLoggedIn, homepagecontroller.handleDept);


    router.get("/addInventory", loginController.checkLoggedIn, homepagecontroller.addInventoryGit); 
    router.post("/addInventory", loginController.checkLoggedIn, homepagecontroller.addInventoryGit); 


    router.get("/delivery", loginController.checkLoggedIn, homepagecontroller.addDeliveryPage); 
    router.post("/addDeliveryPOST", loginController.checkLoggedIn, homepagecontroller.addDelivery);



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