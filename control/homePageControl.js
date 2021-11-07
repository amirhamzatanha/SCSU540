const viewUsers = require('../services/viewUsers');
const handleIndex = async (req, res) => {
    return res.render('../views/index.ejs',{
        user: req.user
    });
};



const handleViewUsers = async( req,res) => {
    const allUsers =  await viewUsers.listUsers();
    return res.render('../views/users', { user: req.user, data: allUsers} );
};




const handleEditUsers = async( req,res) => {
    console.log(req.params.id);
    return res.render('../views/editusers.ejs', { user: req.user, newID: req.params.ID} );
    
};



module.exports = {
    handleIndex: handleIndex,
    handleEditUsers: handleEditUsers,
    handleViewUsers: handleViewUsers
};