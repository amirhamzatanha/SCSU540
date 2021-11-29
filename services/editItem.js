const DBConnection = require('../config/dbconnect');

const showItem = (UPC) => {
    return new Promise( (resolve, reject) =>{
        try{
            //console.log(UPC);
            DBConnection.query(
                'SELECT * FROM items WHERE `UPC` = ?', UPC,
                function(err, rows) {
                    if (err){
                        console.log(err);
                        reject(err)
                    }
                    if (rows.length > 0) {
                        console.log("Function show item is executed ==================");
                        resolve(rows)
                    }
                    else {
                        resolve("error: no item found associated with UPC: " + UPC)
                    }
                }

            )

        }
        catch (err){
            reject(err);
        }
    });
};

const deleteItem = (UPC) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(UPC);
            DBConnection.query(
                'DELETE FROM `items` WHERE `UPC` = ?  ', UPC,
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

const updateItem = (data, UPC) => {
    return new Promise( (resolve, reject) => {
        try {
            console.log(UPC);
            DBConnection.query(
                'UPDATE items SET ? where UPC = ?', [data, UPC],
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    else resolve("Item update successful");
                }
            );
        } catch (err) {
            reject(err);

        }
    });
}
module.exports = {
    showItem: showItem,
    deleteItem: deleteItem,
    updateItem:updateItem
}