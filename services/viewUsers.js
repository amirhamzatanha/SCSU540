const DBConnection = require('../config/dbconnect');

const listUsers = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                'select e.employeeID, e.firstName, e.lastName, e.DOB, e.gender, e.email, e.employeePhone, e.hireDate, p.positionDescription from employees e, positions p join positions using (positionID) where e.positionID=p.positionID'
                ,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        resolve("error: No Users Found.")
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};


const showUser = (userid) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(userid);
            DBConnection.query(
                'select e.employeeID, e.firstName, e.lastName, e.DOB, e.gender, e.email, e.employeePhone, e.hireDate, p.positionDescription from employees e, positions p join positions where e.positionID=p.positionID AND `employeeID` = ?  ', userid,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(rows)
                    } else {
                        resolve("error: No Users Found.")
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
                'Delete from employees where employeeID =  ? ', userid,
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


//==========================Update User==================================================
const updateUser = (employeeID, userdetails) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                'UPDATE employees SET ? where employeeID = ? ', [userdetails, employeeID], 
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    else 
                    resolve("Create a new user successful");
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};


module.exports = {
    listUsers: listUsers,
    showUser: showUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}; 