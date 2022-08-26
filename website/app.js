/* 
Global Variables 
*/

//Example of API call
//https://api.openweathermap.org/data/2.5/weather?zip={zipcode}&appid={APIkey}

//base URL is the first part of the API call
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//my personal API key from OpenWeatherMap
const APIkey = "a8776165b8b7f25d4052dd9c7ce84403";

//key is the last part of the API call
//note: units=imperial is for temperature in Fahrenheit
const Key = "&appid=" + APIkey + "&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
//note: add 1 to month because getMonth() returns months from 0 to 11
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//add an event listener to button generate when it is clicked
const buttonGenerate = document.getElementById("generate");
buttonGenerate.addEventListener("click", generate);

/*
the callback function for click event of button generate
*/
function generate(e) {
  //get user inputs (zipcode, feeling)
  //zipcode which will be used in the API to get temperature
  const zipcode = document.getElementById("zip").value;

  //user feelings which will be shown again in updating the UI
  const feeling = document.getElementById("feelings").value;

  if (zipcode.length === 0 || feeling.length === 0) {
    alert("Please enter all values. ");
    return;
  }
  //call the get request to get the data from the API
  get(baseURL, zipcode, Key)
    //chain a promise to call the post request to save the data
    .then(function (data) {
      post("/post", {
        date: newDate,
        temperature: data.main.temp,
        feeling: feeling,
      });
    })
    //chain another promise that updates the UI dynamically
    .then(() => updateUI());
}

/*
GET in client side
*/
//async function that uses fetch() to make a GET request to the OpenWeatherMap API.
async function get(baseURL, zipcode, apiKey) {
  //fetch the data from the app endpoint
  const response = await fetch(baseURL + zipcode + apiKey);
  if (response.status !== 200) {
    alert("City not found, please enter a valid zip code.");
    return;
  }
  try {
    //transform this data into json object
    const data = await response.json();
    return data;
  } catch (error) {
    //handle errors if exists
    console.log("error", error);
  }
}

/*
POST in client side
*/
//async function that makes a POST request to add data to the app
async function post(url = "/post", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    //convert data from string to json to make it match the Content-Type header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

/*
update the UI 
*/
//async function to retrieve data from app and use it to update the dynamically
async function updateUI() {
  //fetch returns the data from get request
  const request = await fetch("/get");
  try {
    // transform this returned data into json object
    const data = await request.json();
    console.log(data);

    //dynamically update DOM elements with data object
    document.getElementById("date").innerHTML = "Date: " + data.date;

    document.getElementById("temp").innerHTML =
      "Temperature: " +
      Math.round(data.temperature) +
      " degrees (in Fahrenheit)";

    document.getElementById("content").innerHTML =
      "Your feeling: " + data.feeling;
  } catch (error) {
    //handle errors if exists
    console.log("error", error);
  }
}
