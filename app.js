const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=494e541d8491f73b716cc6260a480714";
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
            res.write("<h1>The temperature in London is " + temp + " Kelvin.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
    //res.send("Server is up and running.")
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});