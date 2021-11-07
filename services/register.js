const connection = require('../config/dbconnect');
const bcrypt = require('bcrypt');

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                id:Date.now().toString(),
                fName: data.fName,
                lName: data.lName,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
                designation: data.designation
            };
            console.log(data);
            //create a new account
            connection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};



const checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            connection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);

        }
    });
};
module.exports = {
    createNewUser: createNewUser
};
