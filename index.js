/*
    This is the simplest code you need to create an Express server
*/

// Import and initialize express. Make sure to install express using NPM
const express = require('express')
const app = express()

// Creates a GET route with a path of /hello
// To access this route you can go to localhost:8080/hello in your browser
// or send a GET request to localhost:8080/hello using postman
app.get('/hello', function (req, res) {

    // Send a message as a response to the request
    res.send('Hello world!')
})

/* 
    This method tells our API to listen for incoming requests.
    The first argument to app.listen is the port that we want the API to listen on.
    In this case we use port 8080. The second argument is a function that will
    display a message to the terminal saying that our API is now listening
*/
app.listen(8080, () => console.log(`Example app listening at http://localhost:8080`))