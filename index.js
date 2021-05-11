/*
    This file serves as an example when you have to make a connection to a Mysql database
*/

// Import and initializee express
// Be sure to install it using the npm install command
const express = require('express')
const app = express()

// Import and initialize mysql
const mysql = require('mysql');

/* 
    Create a connection with your Mysql database.
    The host name, user name, and password below must
    be filled in with the values that you get when you 
    created your database instace.
*/
const con = mysql.createConnection({
    host: 'DB_HOST_NAME',
    user: 'DB_USERNAME',
    password: 'DB_PASSWORD'
});


/* 
    This example is a GET endpoint. To access this endpoint 
    you would send a GET request to localhost:8080/queryDb
    You can create any kind of endpoint that you would like (GET,POST,DELETE)
    Here we made it a GET as an example.
*/
app.get('/queryDb', function (req, res) {


    //Use the connection that we created above
    con.connect(function (err) {

        // If there was an error with the connection, handle it here.
        if (error){
            // Print the error to the console
            console.log(error)

            // Send a response back to the user letting them know that there was an error
            res.statusCode(400).send("There was an error")
        }

        // If there was no error with the connection continue with your code
        else{

            // In Mysql we can create different databases. 
            // Here we must tell Mysql which database we want to use
            con.query('Use xxx;');

            // The name of the table that we want to query is named ZipCodes
            // This query selects all of the rows from the ZipCodes table.
            con.query('Select * from ZipCodes;', function (err, result) {
                
                // After making the connection we need to end the connection so
                // that it does not hang
                con.end();

                // If there was an error with our query we handle it here
                if (err){
                    res.statusCode(400).send("There was an error")
                }

                // If there was no error continue with your code
                else{
                    
                    // Here we are printing the results of the query
                    console.log(result);

                    // Send the results back to the user
                    res.statusCode(200).json(result)
                }
                
            });   
        }
    });

})


// We must tell our API to listen for incoming connections
app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))
