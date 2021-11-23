const viewUsers = require('../services/viewUsers');
const inventory = require('../services/inventory');

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
    catch{
        req.flash("errors", err);
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
    addInventoryGit: addInventoryGit
};