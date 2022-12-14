const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  //you need a apiKEY from openweathermap.org to use this
  const apiKey = "";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=" +
    unit;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.list[0].main.temp;
      const weatherDescription = weatherData.list[0].weather[0].description;
      const iconImg = weatherData.list[0].weather[0].icon;
      const urlImg = "https://openweathermap.org/img/wn/" + iconImg + "@2x.png";

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees celsius.</h1>"
      );

      res.write("<h2>Weather description: " + weatherDescription + ".</h2>");

      res.write('<img src="' + urlImg + '" alt="WeatherIMG">');

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
