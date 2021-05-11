/*
    In this file there are several examples of the 
    different types of API endpoints that we can make that include
    - GET
    - POST
    - DELETE
    There are also examples of using query parameters.
*/


// Import and initializee express
// Be sure to install it using the npm install command
const express = require('express')
const app = express()

// Axios is what allows us to make requests to API's so we must import it.
// Be sure to install it using the npm install command
const axios = require('axios');


// We must include this in order for us to be 
// able to read the data from an incoming post request
app.use(express.json());


// This is an example of a GET endpoint. To access this endpoint 
// you would send a GET request to localhost:8080/getEndpoint
app.get('/getEndpoint', function (request1, response1) {

    // Use axios to make a GET request to a third party API. Here the value of name is hard coded
    axios.get('https://api.agify.io?name=Mike')

    // If everything went well and when the request is complete
    // this method handles the response
    .then(function (response2) {

        // Print the data to the console located in your terminal
        console.log(response2.data);

        // Send a response back to response1 with a status code of 200 and attach the data from 
        // response2 to the response to response1
        response1.status(200).json(response2.data);
        
    })
    
    // If there was an error during our API request, handle it here
    .catch(function (error) {

        // Print the error to the terminal
        console.log(error)

        // Send an JSON error message back to the user with a status code of 400
        response1.status(400).json({error:"An error occurred"});
    })
})


/* 
    This is an example of a GET endpoint. In this example you must also 
    send a query parameter of name.
    An example request is a GET request at localhost:8080/getEndpointQuery?name=John
*/
app.get('/getEndpointQuery', function (request1, response1) {

    // Anything after the question mark is considered a query parameter.
    // Query parameters come in object form meaning that they are key value paired.
    // Below we are getting the value of name by using the dot notation.
    console.log(request1.query)
    let name = request1.query.name;

    // Use axios to make a GET request to a third party API. Here the value of name is the value
    // of the query parameter that we received above.
    axios.get('https://api.agify.io?name='+name)

    // If everything went well and when the request is complete
    // this method handles the response
    .then(function (response2) {

        // Print the data to the console located in your terminal
        console.log(response2.data);

        // Send a response back to response1 with a status code of 200 and attach the data from 
        // response2 to the response to response1
        res.status(200).json(response2.data);
    })
    // If there was an error during our API request, handle it here
    .catch(function (error) {
        
        // Print the error to the terminal
        console.log(error)

        // Send an JSON error message back to the user with a status code of 400
        response1.status(400).json({error:"An error occurred"});
    })
})

/*
    APIs at times hold sensitive information such as social security numbers,
    bank information, medical information and so on. In order to access protected resources
    like those and others we need a special key. In this example we are using a special key
    to access an API that requires a key.
    An example request is a GET request at localhost:8080/usesKey.
    NOTE: Keys can be used with any HTTP method (GET,POST,DELETE)
*/
app.get('/usesKey', function (request1, response1) {

    /*
        This is the key that we are using to access the protected resources.
        While it is located here in the code, this is only an example. The best thing
        to do when using a key is to place it inside of a .env file.
        For more examples of a dotenv file refer to  https://www.npmjs.com/package/dotenv
    */
    const key = '25fd9757-6b56-4b7d-a20a-a720a7005029'
    
    /* 
        Here we are using axios to make a GET http request.
        This request however requires a key to be sent with it as well so we 
        are requiring it as part of the headers of the request.
    */
    axios.get('https://api.thecatapi.com/v1/images/search',{
        headers:{'Authorization':key}})

    // If everything went well and when the request is complete
    // this method handles the response
    .then(function (response2) {

        // Print the data to the console located in your terminal
        console.log(response2.data);

        // Send a response back to response1 with a status code of 200 and attach the data from 
        // response2 to the response to response1
        response1.status(200).json(response2.data);
    })
    // If there was an error during our API request, handle it here
    .catch(function (error) {
        
        // Print the error to the terminal
        console.log(error)

        // Send an JSON error message back to the user with a status code of 400
        response1.status(400).json({error:"An error occurred"});
    })
})

/*
    This is an example of a post endpoint. With post endpoints
    there is usually a JSON body that gets sent with part of a request.
    An example request is a POST request at localhost:8080/hasBody
    with an accompanying body of
     { 
        'name':someones name,
        'address':someones address
    }
*/
app.post('/hasBody', function (request1, response1) {


    /*
        Print the data that is coming in as part of the request
        Data coming in should be a JSON object that has a name and an address
        { 
            'name':someones name,
            'address':someones address
        }
    */ 
    console.log(request1.body);
    
    // Create a body constant that is equal to the data coming in
    const body = {
        name: request1.body.name,
        address: request1.body.address
    }

    /* 
        Use axios to send a POST request to the API. Here we need to make sure that
        we are including the body constant that we created right above. If we do not 
        include that then we wont be adding anyone to the database.
    */
    axios.post('https://java-sample-api-2020.herokuapp.com/addPerson',body)

    // If everything went well and when the request is complete
    // this method handles the response
    .then(function (response2) {

        // Print the data to the console located in your terminal
        console.log(response2.data);

        // Send a response back to response1 with a status code of 200 and attach the data from 
        // response2 to the response to response1
        response1.status(200).json(response2.data);
    })

    // If there was an error during our API request, handle it here
    .catch(function (error) {
        
        // Print the error to the terminal
        console.log(error)

        // Send an JSON error message back to the user with a status code of 400
        response1.status(400).json({error:"An error occurred"});
    })
})

app.listen(8080, () => console.log(`Example app listening at http://localhost:8080`))
