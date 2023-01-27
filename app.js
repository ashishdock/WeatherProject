const express = require("express");
const http = require("http");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var a = req.body.cityName;
  console.log(a);

  var cities = ["Abu Dhabi", "Ajman", "Al Ain", "Sharjah", "Andarab District"];

  var datavalu = Number(cities.indexOf(a));
  // const namec = a;

  const url = "http://geodb-free-service.wirefreethought.com/v1/geo/cities";
  http.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const ctdata = JSON.parse(data);
      const popul = ctdata.data[datavalu].population;
      //const show = ctdata.data[0].city;
    //  const show1 = ctdata.data[3].name;
      //console.log(show);
    //   res.send("<h1>The data I got from the API is " + show + "<h1>"
    //         + "<br>" + "<h1> The other city is " + show1 + "<h1>"
    // );
    // alternate way to send multiple lines
    res.write("<h1>The population of " + a + " is " + popul + "<h1>");
    //res.write( "<br>" + "<h1> The second city shown another way is " + show1 + "<h1>");
    res.send();
    });
  });

    // res.send("Server is up and running"); There can only be one res.send, NEVER MORE THAN ONE




});





app.listen(3000, function(){
  console.log("Server is running on port 3000");
});


// ciy data[0].name   data[1].name
// population = data[0].population
//http://geodb-free-service.wirefreethought.com/v1/geo/cities?data=0&name=&population=
