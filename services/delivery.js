const connection = require('../config/dbconnect');

const findItemExistingAmount = (data) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log("Inside findItemExistingAmount")
            console.log(data);

            connection.query(
                ' SELECT `amount` FROM `items` WHERE `UPC` = ?  ', data,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (rows.length > 0) {
                        resolve(rows[0].amount)
                    } else {
                        reject("Error: No Items listed for this department.")
                    }
                }
            );
            console.log("End of Query!");
        } catch (err) {
            reject(err);

        }
        console.log("End of Function!");
    });
};

const updateItemInventory = (currentAmount, addedAmount, currentUPC) => {

    return new Promise( (resolve, reject) => {
        try {
            console.log("Inside updateItemInventory");
            console.log(currentAmount);
            console.log(typeof(currentAmount));
            console.log(addedAmount);
            console.log(typeof(addedAmount));
            console.log(currentUPC);
            console.log(typeof(currentUPC));
            console.log("---------------------");

            //const currentItemAmount = findItemExistingAmount(data);
            //console.log("Current Item Amount");
            //console.log(currentItemAmount);
            //const newAmount = data.amount + currentItemAmount;

            const newAmount = addedAmount + currentAmount;
            console.log(newAmount);
            connection.query(
                ' UPDATE `items` SET `amount` = ' + newAmount + ' WHERE `UPC` = ?', currentUPC,
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(false)
                        
                    }
                    resolve("Successful Addition to Database!");

                }
            );
        } catch (err) {
            reject(err);
        
        }
    });
};


module.exports = {
    updateItemInventory: updateItemInventory,
    findItemExistingAmount: findItemExistingAmount
};
