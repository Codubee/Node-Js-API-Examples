// Import and initialize express. Make sure to install express using NPM
const express = require('express')
const app = express()
app.use(express.json());
require('dotenv').config();
const axios = require('axios');


// Creates a GET route with a path of /delivery
app.get('/delivery', function (req, res) {

    // Here you are adding an authentication token to an object that
    // represents the headers of your request. You can see that
    // the token is not included here and should NEVER be included directly in the file.
    // Instead we are grabbing the token from the .env file
    // We are using the dotenv node package to read the contents of that file
    // The documentation can be seen here https://www.npmjs.com/package/dotenv
    const config = {headers:{'Authorization':'Bearer '+process.env.API_TOKEN}}

    // Include the object that contains the token in the GET request
    axios.get('https://api.yelp.com/v3/transactions/delivery/search?latitude=37.787789124691&longitude=-122.399305736113',config)
    .then((yelpRes)=>{
        console.log(yelpRes.data)
        res.json(yelpRes.data)
    })
    .catch((err)=>{
        console.log(err)
        res.json({"msg":"Error with request"})
    })
})

app.listen(8080, () => console.log(`Example app listening at http://localhost:8080`))