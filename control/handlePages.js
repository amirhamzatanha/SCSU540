const viewUsers = require('../services/viewUsers');
const inventory = require('../services/inventory');
const { body } = require('express-validator');
const delivery = require('../services/delivery');
const editItem = require('../services/editItem');

const handleIndex = async (req, res) => {
    return res.render('index.ejs',{
        user: req.user
    });
};



const transactionDetails = async( req,res) => {
    const userid = req.user.employeeID;
    console.log('userID in Transaction Details ' + userid);

    try{
        const transcDetails = await inventory.viewTransactions(userid);
        console.log(transcDetails);
        const total = await inventory.viewTotalTransactions(userid);
        const result = total[0].sumTranc + total[0].tax
        console.log(total.sum);
        return res.render('cashierDetails', { user: req.user, data: transcDetails, result: result.toFixed(2),  errors: req.flash("errors")});

    }
    catch(err){
        req.flash("errors", err);
        console.log(err);
        res.redirect("/");

    }
    

    
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
        const message =[];
        return res.render('editInventory', { user: req.user, dept: departments, message, errors: req.flash("errors")});

    }
    catch(err){
        req.flash("errors", err);
        console.log(err);
        res.redirect("/");

    }
    
};

const addInventoryPost = async( req,res) => {
    const data = {
        UPC: req.body.UPC,
        deptNum: req.body.deptNum,
        price: req.body.price,
        itemDescription: req.body.itemDescription,
        notes: req.body.notes,
        amount: req.body.amount
    }
    console.log ("Data Received ============" + data);

    try{
        const message = await inventory.addNewItem(data);
        const departments = await inventory.viewDepartments();
        return res.render('editInventory', { user: req.user, dept: departments, message, errors: req.flash("errors")});

    }
    catch(err){
        req.flash("errors", err);
        console.log(err);
        res.redirect("/addInventory");

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
        user: req.user, errors: req.flash("errors")
    });
};

const addDelivery = async( req,res) => {
    

    try{
        let updateData = {
        UPC: req.body.UPC,
        Amount: req.body.Amount,
        };

        amountInt = parseInt(updateData.Amount);
        
        const itemAmount = await delivery.findItemExistingAmount(updateData.UPC);
       
        const newTotal = await delivery.updateItemInventory(itemAmount, amountInt, updateData.UPC);
        console.log("DONE WITH FUNCTION!")
        return res.render('delivery.ejs', { user: req.user, newTotal: newTotal, errors: req.flash("errors") } );
    }
    catch (err){
        req.flash("errors", err);
        
        return res.redirect('/delivery');
        //return res.send('Error! The UPC you entered does not exist in the system. Have the Price Coordinator enter a new item. Use the back button to proceed.');

    }
    
};


const handleShowItem = async (req,res) => {
    try {
        const itemInfo = await editItem.showItem(req.params.UPC);
        res.render('editItem',{user:req.user, itemInfo, errors:req.flash("error")});

    }
    catch (err) {
        req.flash("errors", err);
        res.redirect("/inventory");
    }
}

const updateItem = async( req,res) => {
    
    const data1 = 
    {
        itemDescription: req.body.itemDescription,
        price:  req.body.price,
        notes: req.body.notes
    }

    try{
        await editItem.updateItem(data1, req.body.UPC)
        const departments = await inventory.viewDepartments();
        const data = [];
        return res.render('viewInventory', { user: req.user, dept: departments, data: data, errors: req.flash("errors")})
    }
    catch (err){
        req.flash("errors", err);
        res.redirect("viewInventory");

    }
    
};

const handleDeleteItem = async(req,res) => {
    try{
        await editItem.deleteItem(req.params.UPC);
        const departments = await inventory.viewDepartments();
        const data = [];
        return res.render('viewInventory', { user: req.user, dept: departments, data: data, errors: req.flash("errors")});
    }
    catch{
        req.flash('errors',err);
        res.redirect("/");
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
    addDelivery: addDelivery,
    handleShowItem: handleShowItem,
    updateItem: updateItem,
    handleDeleteItem: handleDeleteItem,
    addInventoryPost: addInventoryPost,
    transactionDetails: transactionDetails
};