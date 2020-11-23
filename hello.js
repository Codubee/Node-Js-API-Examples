const express = require('express')
const app = express()
const axios = require('axios');
//For documentation on axios refer to the npm module
//https://www.npmjs.com/package/axios


//This endpoint has no route parameters
app.get('/getEndpoint', function (req, res) {

    axios.get('https://api.agify.io?name=Mike')
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        // It is good practice to handle the error and send back the 
        // error message that was received from the API call
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})


//This endpoint has the route parameter name
app.get('/getEndpoint/:name', function (req, res) {

    //Log the request parameters
    console.log(req.params.name)
    let name = req.params.name;

    axios.get('https://api.agify.io?name='+name)
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        // It is good practice to handle the error and send back the 
        // error message that was received from the API call
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

//This endpoint has a key in the headers
app.get('/usesKey', function (req, res) {

    //The key is placed inside of the dotenv file
    //We are simple referecing it here
    const key = process.env.API_KEY
    
    axios.get('https://api.thecatapi.com/v1/images/search',{
        headers:{'Authorization':key}})
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        // It is good practice to handle the error and send back the 
        // error message that was received from the API call
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

//This endpoint has a body as a part of the API call
app.post('/usesKey', function (req, res) {

    
    const body = {
        firstName: 'Foo',
        lastName: 'Bar'
    }

    axios.post('https://www.someplace.com',body)
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        // It is good practice to handle the error and send back the 
        // error message that was received from the API call
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))
