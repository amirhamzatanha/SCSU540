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


//view inventrory based on the department 
const viewInvetory = (deptID) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(deptID);
            DBConnection.query(
                ' SELECT * FROM `items` WHERE `deptNum` = ?  ', deptID,
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
    deleteUser: deleteUser
}; 