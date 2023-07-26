"use strict";

const starterScreen = document.querySelector(".starter-screen");
const searchBox1 = document.querySelector(".search-box-1");
const searchBox2 = document.querySelector(".search-box-2");
const tomorrow = document.getElementById("tomorrow");
const weatherContainer = document.querySelector(".weather-container");
const defaultMessage = document.querySelector(".default-message");

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const apiKey = "9242e0402c586b72597bb12508998a96";
const limit = 1; // Define the limit for the API request

//DEFINE THESE VARIABLES INSIDE MAINFUNCTION AND GET TOMORROWS DATA AS WELL
//IT IS THEN POSSIBLE TO CREATE A NEW FUNCTION FOR TOMORROW WITH NO MORE API CALLS

//TRY REFACTORING THE CODE WITH ASYNC/AWAIT INSTEAD

let cityNameGlobal = "";
let tomorrowWeatherData = null;

searchBox1.addEventListener("keydown", handleSearch);
searchBox2.addEventListener("keydown", handleSearch);
tomorrow.addEventListener("click", getTomorrow);

//INITIATE SEARCH AND TRIGGER MAIN FUNCTION
function handleSearch(e) {
  if (e.keyCode === 13) {
    const searchBox = e.target;
    const cityName = searchBox.value;
    mainFunction(cityName);
    searchBox.value = "";
    searchBox.blur();
  }
}

//MAIN FUNCTION
function mainFunction(cityName) {
  //FETCH COORDINATES FROM NAME PROVIDED
  getCityCoords(cityName)
    .then((data) => {
      const { lat, lon } = data[0];
      //RUN GETWEATHERDATA WITH THE COORDINATES
      return getWeatherData(lat, lon);
    })
    .then((getWeatherData) => {}) //WHAT IS THIS? // // // // // // // //
    .catch((error) => {
      temp.textContent = "";
      humidity.textContent = "";
      wind.textContent = "";
      description.textContent = "City not found";
      city.textContent = "";
      defaultMessage.textContent = "City not found";

      console.log(error);
    });
}

//FUNCTION THAT RETURNS COORDINATES FROM CITY NAME
function getCityCoords(cityName) {
  const apiCityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}&units=metric`;

  return fetch(apiCityUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

//FUNCTION THAT RETURNS WEATHER DATA FROM COORDINATES
function getWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temp.textContent = `${Math.round(data.main.temp)}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity} %`;
      wind.textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;
      description.textContent = `${data.weather[0].description}`;
      city.textContent = data.name;
      starterScreen.style.display = "none";
      weatherContainer.style.display = "block";
      return data;
    });
}

//TOMORROW'S WEATHER
function getTomorrow() {
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = "";
  wind.textContent = "";
  description.textContent = `${data.weather[0].description}`;
  city.textContent = data.name;
  starterScreen.style.display = "none";
  weatherContainer.style.display = "block";
  return data;
}
