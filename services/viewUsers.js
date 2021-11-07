const DBConnection = require('../config/dbconnect');

const listUsers = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` ',
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
module.exports = {
    listUsers: listUsers
}; 