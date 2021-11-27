const viewUsers = require('../services/viewUsers');
const inventory = require('../services/inventory');
const { body } = require('express-validator');
const delivery = require('../services/delivery');

const handleIndex = async (req, res) => {
    return res.render('index.ejs',{
        user: req.user
    });
};



const handleViewUsers = async( req,res) => {
    const allUsers =  await viewUsers.listUsers();
    return res.render('users', { user: req.user, data: allUsers} );
};

const handleDeleteUser = async( req,res) => {
    await viewUsers.deleteUser(req.params.id);
    const allUsers =  await viewUsers.listUsers();
    return res.render('users', { user: req.user, data: allUsers} );
    
};

const handleEditUser = async(req, res) =>{
    const userDetails =  await viewUsers.showUser(req.params.id);
    return res.render('editUser', {user: req.user,  userDetails, errors: req.flash("errors") } );

}

const handleInventory = async( req,res) => {
    try{
        const departments = await inventory.viewDepartments();
        const data = [];
        return res.render('viewInventory', { user: req.user, dept: departments, data: data, errors: req.flash("errors")});

    }
    catch{
        req.flash("errors", err);
        res.redirect("/");

    }
    

    
};

const handleDept = async( req,res) => {
    console.log(req.body.deptNum);

    try {
        const departments = await inventory.viewDepartments();
        const data = await inventory.viewInvetory(req.body.deptNum);
        console.log(data);
        return res.render('viewInventory', { user: req.user, dept: departments, data: data, errors: req.flash("errors") } );

    }
    catch(err){
        req.flash("errors", err);
        res.redirect("/inventory");


    }
    
};


const addInventoryGit = async( req,res) => {

    try{
        const departments = await inventory.viewDepartments();
        const data = [];
        return res.render('editInventory', { user: req.user, dept: departments, data: data, errors: req.flash("errors")});

    }
    catch(err){
        req.flash("errors", err);
        console.log(err);
        res.redirect("/");

    }
    
};


const updateUser = async( req,res) => {
    const employeeID = req.body.employeeID;
    const userdetails = {
        firstname: req.body.firstName,
        lastName: req.body.lastName,
        employeePhone: req.body.employeePhone,
        gender: req.body.gender, 
        DOB: req.body.DOB, 
        hireDate: req.body.hireDate
        }
    try{
        const update = await viewUsers.updateUser(employeeID, userdetails);
        const allUsers =  await viewUsers.listUsers();
        return res.render('users', { user: req.user, data: allUsers} );        }
    catch(err){
            req.flash("errors", err);
            console.log(err);
            res.redirect("/users");
    
        }


    
    
};


const addDeliveryPage = async (req, res) => {
    console.log("Delivering Delivery Page");
    return res.render('delivery.ejs',{
        user: req.user
    });
};

const addDelivery = async( req,res) => {
    

    try{
        let updateData = {
        UPC: req.body.UPC,
        Amount: req.body.Amount,
        };

        amountInt = parseInt(updateData.Amount);
        console.log(updateData);
        console.log(typeof(req.body.UPC));
        console.log(typeof(amountInt));
        console.log("Made it to the addDelivery Function");
        const itemAmount = await delivery.findItemExistingAmount(updateData.UPC);
        console.log("Past Function");
        console.log(itemAmount);
        console.log(typeof(itemAmount));
        const newTotal = await delivery.updateItemInventory(itemAmount, amountInt, updateData.UPC);
        console.log("DONE WITH FUNCTION!")
        return res.render('delivery.ejs', { user: req.user, newTotal: newTotal, errors: req.flash("errors") } );
    }
    catch{
        console.log("Error Function");
        //req.flash("errors", err);
        return res.send('Error! The UPC you entered does not exist in the system. Have the Price Coordinator enter a new item. Use the back button to proceed.');

    }
    
};

module.exports = {
    handleIndex: handleIndex,
    handleDeleteUser: handleDeleteUser,
    handleViewUsers: handleViewUsers,
    handleEditUser: handleEditUser, 
    handleInventory: handleInventory,
    handleDept: handleDept,
    addInventoryGit: addInventoryGit,
    updateUser: updateUser,
    addDeliveryPage: addDeliveryPage,
    addDelivery: addDelivery
};