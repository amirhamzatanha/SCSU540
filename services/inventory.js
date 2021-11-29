const DBConnection = require('../config/dbconnect');


//view departments on load of inventory page: 
const viewDepartments = () => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                'SELECT * FROM `departments` ',
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        resolve("error: No record Found.")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};

//view inventory 

const viewTransactions = (userID) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(userID);
            DBConnection.query(
                'select distinct transactionID, firstName, lastName, paymentID, transactionTotal, paymentMethod, employeeID from transactionitems natural join paymentinfo natural join customers natural join customertransaction natural join employeetransaction where employeeID = ?', userID,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        reject("Error: No Items listed for this User.")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};

//find total for the Transactions
const viewTotalTransactions = (userID) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(userID);
            DBConnection.query(
                'select SUM(Cost) as sumTranc, SUM(tax) as tax from employeetransaction natural join transactionitems where employeeID = ?', userID,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        reject("Error: No Items listed for this User.")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};
//view inventrory based on the department 
const viewInvetory = (deptID) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(deptID);
            DBConnection.query(
                ' SELECT * FROM `items` NATURAL JOIN `departments` NATURAL JOIN `taxes` WHERE `deptNum` = ?  ', deptID,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        reject("Error: No Items listed for this department.")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};

///ADD new item to the inventory 
const addNewItem = (data) => {
    return new Promise( (resolve, reject) => {
        try {

            DBConnection.query(
                ' INSERT into `items` SET ?  ', data,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject("Error: UPC already being used");
                    }
                     else {
                        resolve("Record added successfully")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};


//==========================Delete User==================================================
const deleteUser = (userid) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(userid);
            DBConnection.query(
                'DELETE FROM `users` WHERE `id` = ?  ', userid,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    else resolve(rows);
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};


module.exports = {
    viewDepartments: viewDepartments,
    viewInvetory: viewInvetory,
    deleteUser: deleteUser,
    addNewItem: addNewItem,
    viewTransactions: viewTransactions,
    viewTotalTransactions: viewTotalTransactions
}; 