const express = require('express')
const app = express()
/*
    For documentation on axios refer to the npm module
    https://www.npmjs.com/package/axios
*/
const axios = require('axios');

/*
    If we are reading request post data, we must include this
    in order for us to be able to read the data
*/
app.use(express.json());


// This endpoint has no query parameters
app.get('/getEndpoint', function (req, res) {

    axios.get('https://api.agify.io?name=Mike')
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        /* 
            It is good practice to handle the error and send back the 
            error message that was received from the API call
        */ 
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})


// This endpoint takes in a name query parameter
// An example request is localhost:3000/getEndpoint?name=John
app.get('/getEndpoint', function (req, res) {

    // Log the query parameters
    console.log(req.query)
    let name = req.query.name;

    //Make a get request with the name query parameter
    axios.get('https://api.agify.io?name='+name)
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        /* 
            It is good practice to handle the error and send back the 
            error message that was received from the API call
        */ 
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

// This endpoint has a key in the headers
app.get('/usesKey', function (req, res) {

    /*
        The key is placed inside of a dotenv file
        We are simple referecing it here.
        For more examples of a dotenv file refer to  https://www.npmjs.com/package/dotenv
    */
    const key = process.env.API_KEY
    
    axios.get('https://api.thecatapi.com/v1/images/search',{
        headers:{'Authorization':key}})
    .then(function (response) {
        // handle success and send back a 200 response with the data
        console.log(response.data);
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        /* 
            It is good practice to handle the error and send back the
            error message that was received from the API call
        */ 
        console.log(error)
        res.status(400).json({error:"An error occurred"});
    })
})

// This endpoint has a body as a part of the API call
app.post('/hasBody', function (req, res) {


    /*
        View the data that is coming in as part of the request
        Data coming in should be a JSON object that has a name and an address
        { 
            'name':someones name,
            'address':someones address
        }
    */ 
    console.log(req.body);
    
    const body = {
        name: req.body.name,
        address: req.body.address
    }

    axios.post('https://java-sample-api-2020.herokuapp.com/addPerson',body)
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
