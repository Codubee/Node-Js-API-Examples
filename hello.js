const express = require('express')
const app = express()
const mysql = require('mysql');
require('dotenv').config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

//This endpoint has no route parameters
app.get('/queryDb', function (req, res) {


    //Create the connection
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        // xxx is the name of our database. Have to tell mysql which database to use
        con.query('Use xxx;');

        // The name of our table is Zipcodes
        // This gets all rows from our table
        con.query('Select * from ZipCodes;', function (err, result) {
            if (err) throw err;
            console.log(result);
        });

        //Send back the result to the front end

        con.end();
    });

})

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))
