const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

    //res.send("Server is up and running.")
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apikey = "494e541d8491f73b716cc6260a480714";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // const object = {
            //     name: "Angela",
            //     facouriteFood: "Ramen"
            // }
            // console.log(JSON.stringify(object));
            res.write("<p>The weather is currently " + weatherDescription + ".</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});