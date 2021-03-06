//select the necessary HTML elements will be used to set DOM elements from the API
const weatherIcon = document.querySelector(".weather-icon");
const tempValue= document.querySelector(".temperature-degree p");
const tempDescription= document.querySelector(".temperature-description p");
const locationElement= document.querySelector(".location h3");
const notification= document.querySelector(".notification");

// We will use this value to convert the temperature to fahreinheit or celsius
const KELVIN = 273;
const API_KEY = "82005d27a116c2880c8f0fcb866998a0";

// Contains the App data
const weatherData = {};

weatherData.temperature = {
    unit : "celsius"
}


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setGeoPosition, showError);
}else{
    notificationstyle.display = "block";
    notification.innerHTML = "<p> Sorry but your Browser doesn't Support Geolocation</p>";
}

//sets the user longitude and latitude
function setGeoPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// if users browser has issues with geolocation show error
function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.message} </p>`;
}

// get weather data from the API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data)
            return data;
        })
        .then(function(data){
            const{ description} = data.weather[0];

            weatherData.temperature.value = Math.floor(data.main.temp - KELVIN);
            weatherData.description= description;
            weatherData.iconId = data.weather[0].icon;
            weatherData.city = data.name;
            weatherData.country = data.sys.country;
            console.log(weatherData.iconId);


            
        })
        .then(function(){
            displayWeather();
        });
}


// // setsIcon
function setIcon(icon,iconId){
const skycon = new Skycons({color:'#fffff'});
const currentIcon = icon.replace(/ /g,"_").toUpperCase();

skycon.play();
console.log(currentIcon);
return skycon.set(iconId,Skycons[currentIcon]);

}


// display the weather in the UI
function displayWeather(){
    weatherIcon.innerHTML=setIcon(`${weatherData.description},${weatherData.iconId}`);
    tempValue.innerHTML = `${weatherData.temperature.value}°<span>C</span>`;
    tempDescription.innerHTML = weatherData.description;
    locationElement.innerHTML = `${weatherData.city}, ${weatherData.country}`;
}

// A function to convert celsius to fahrenheit
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//  Changes temperature to either Celsisus or Fahrenheit when a user clicks on it.
tempValue.addEventListener("click", function(){
    if(weatherData.temperature.value === undefined) return;
    
    if(weatherData.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weatherData.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempValue.innerHTML = `${fahrenheit}°<span>F</span>`;
        weatherData.temperature.unit = "fahrenheit";
    }else{
        tempValue.innerHTML = `${weatherData.temperature.value}°<span>C</span>`;
        weatherData.temperature.unit = "celsius"
    }
});