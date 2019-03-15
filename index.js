const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
let results = {};

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    // res.sendFile(__dirname + "/index.html");
    res.render("home");
});

app.get("/results", function(req, res){
    res.render("results", {
        results: results
    });
});

app.post("/", function(req, res) {
    
        crypto = req.body.crypto;
        fiat = req.body.fiat;

        amount = req.body.amount;

        var options = {
            url: "https://apiv2.bitcoinaverage.com/convert/global",
            method: "GET",
            qs: {
                from: crypto,
                to: fiat,
                amount: amount
            }
        }
    
        request(options, function(error, response, body){
        let data = JSON.parse(body);
        results = {    
            price: data.price,     
            currentDate: data.time,
            crypto: crypto,
            fiat: fiat,
            amount: amount
        };

        res.redirect("/results");
        // res.write("<p>The current date is: " + currentDate + "</p>");
        // res.write("<h1>" + amount + " " + crypto + " is currently worth " + price + " " + fiat + "</h1>");
        // res.send();
        
        
    });
});

app.listen(3000, function(){
    console.log('Server is running on Port:3000');
});