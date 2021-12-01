# root
 This is a simple client/server application
 In order to make this work you need to have a connection in mysql to a server.
 add any user with all priviledges. make sure to use a user except root (for some reason it doesn't work properly).
Now you have a workspace so add the Supermarketwithvalues.sql script to your workspace and run it.
Make sure to place everything in the same directory.

in dbconnect.js you need to mention 4 things:
#edit this function
const connection = mysql.createConnection({
    host: "localhost",
    user: "USERNAME",           #enter user you created for workspace
    password: "1234567890",     #add the associated password for that user
    database: "supermarketSystem"
});
Now go to the directory you placed all files in , from the command line and run the Server.js file
then run the program and the browser will open.
#project by:
1.Vinaydeep Singh
2.Mir Hamza Nasiri
3.Rafael Ramos
4.Kevin Kuna
