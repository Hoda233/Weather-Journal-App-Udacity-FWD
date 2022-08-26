// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

//callback function to check server
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}

/*
GET in server side
*/
//get route to return the projectData object
app.get("/get", getdata);

function getdata(request, response) {
  response.send(projectData);
}

/*
POST in server side
*/
//post route to add incoming data to projectData object
app.post("/post", postdata);

function postdata(request, response) {
  projectData = request.body;
  response.send(projectData);
}
