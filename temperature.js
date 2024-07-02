//Update every second just like the clock
setInterval(getGeo, 1000)

function getGeo() {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //Calls the function to get the name, temperature, weather condition from coordinates
        getLocation(latitude, longitude);
    }

    function error() {
        const status = document.querySelector(".coordinates");
        status.textContent = "Unable to retrieve your location";
    }

    if(!navigator.geolocation) {
        const status = document.querySelector(".coordinates");
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function getLocation(x, y) {
    const card = document.querySelector(".card");
    const apiKey = "71edc19dfa1c4220953673d74f662847";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+`${x}`+"&lon="+`${y}`+"&appid="+`${apiKey}`;

    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        card.textContent = ""; //Keep this, Without it, the card infinitely gets longer and longer with the same weather information
        card.style.display = "flex";


        //Fills in the rest of the HTML in the div element
        const cityDisplay = document.createElement("h4");
        const tempDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("h1");

        //Assigning different data from the weather info pulled
        const city = data.name;
        const temp = Math.ceil((((data.main.temp - 273.15) * (9/5) + 32))) + "°F";
        const weatherId = data.weather[0].id;

        //document.querySelector("#weatherDisplay").textContent = data.name + ":" + " " + Math.ceil((((data.main.temp - 273.15) * (9/5) + 32))) + "°F" + " " + getWeatherEmoji(data.weather[0].id);
    
        //Fills in the created HTML elements with inner content
        cityDisplay.textContent = city;
        tempDisplay.textContent = temp;
        weatherEmoji.textContent = getWeatherEmoji(weatherId);

        //Assings the created HTML elements a certain defined class from the corresponding CSS style
        cityDisplay.classList.add(".card");
        tempDisplay.classList.add(".card");
        weatherEmoji.classList.add(".card");

        //Adds the created HTML element to the parent div element
        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(weatherEmoji);
    })
    .catch()
}

//Courtesy of BroCode on YouTube (Thank you!!)
function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300) :
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400) :
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600) :
            return "☔";
        case (weatherId >= 600 && weatherId < 700) :
            return "❄️";
        case (weatherId >= 700 && weatherId < 800) :
            return "🌁";
        case (weatherId === 800) :
            return "☀️";
        case (weatherId >= 801 && weatherId < 810) :
            return "🌥️";
        default:
            return "❓";

    }
}