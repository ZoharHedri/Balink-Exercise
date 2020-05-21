const express = require('express');
const app = express();
const path = require('path'); //built-in
const request = require('request');
const bodyParser = require('body-parser'); //built-in, post request


const customerList = []

// post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Serving Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Servind Data
app.get('/', function (req, res) {
    console.log("Someone has come into the server");
    res.send("Hello from server");
})

app.get('/countries', function (req, res) {
    let countries;
    request.get('https://restcountries.eu/rest/v2/all', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the Google homepage. 
            console.log('Countries')
            countries = JSON.parse(body)
        }
        //console.log("countries from the server");
        res.send(countries);
    });

})

app.post('/saveCustomerDetails', function (req, res) {
    const customerDetails = req.body;
    console.log(customerDetails)
    if (customerDetails.firstName == "" ||
        customerDetails.lastName == "" ||
        customerDetails.country == "" ||
        customerDetails.email == "") {
        res.send('400');
    } else {
        customerList.push(customerDetails);
        res.send('200');
    }
})

const port = 8000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})