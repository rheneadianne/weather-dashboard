const key = "144388fc324c756c59444081cd06de18" // open weather API key
const fiveDayForecastBox = document.querySelector(".fiveDayForecastBox") // 5 day forecast card container

// Calling Server-side API to Generate Weather Information
const currentWeather = (cityName = "Toronto") => { //defaults to Toronto 
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`) // Geolocator API that determines latitude and longtitude based on entered city name
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const cityDetailsTitle = document.querySelector(".cityDetailsTitle") // City title container
            const cityDetails = document.querySelector(".cityDetails") // Container that holds current weather details for the day
            let currentTime = moment().format("YYYY-MMM-DD") // current date
            let lat = data[0].lat // latitude
            let lon = data[0].lon // longtitude
            const weatherTitle = `${data[0].name} (${currentTime})` // Eg. Toronto 2022-Jun-15
            cityDetailsTitle.innerHTML = weatherTitle // adds weatherTitle to City title container

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`) // fetching API. Latitude and Longtitude based on entered city name using geolocator API
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const weatherImg = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png"/>` // current weather icon
                    const weatherDescription = data.list[0].weather[0].description // short description of current weather
                    cityDetailsTitle.innerHTML = `${weatherImg} ${weatherTitle} <i><small>${weatherDescription}</small</i>` // adds weather icon and short description of City title container
                    const cityDetailsList = `
                    <li class="list-group-item">Current Temperature: ${data.list[0].main.temp}°C</li>
                    <li class="list-group-item">Feels like: ${data.list[0].main.feels_like}°C</li>
                    <li class="list-group-item">Wind Speed: ${data.list[0].wind.speed} km/h</li>
                    <li class="list-group-item">Humidity: ${data.list[0].main.humidity}%</li>
                    ` // list of weather details for the current day that populates in cityDetails
                    cityDetails.innerHTML = cityDetailsList // API for UV Index and 5 day forecast
                    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            const uvIndex = data.current.uvi // conditional expressions that determines colour of UV index to alert user at first glance of UV index
                            0 <= uvIndex && uvIndex <= 3 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-success p-2 rounded text-white">${uvIndex}</span></li>` :
                                3 <= uvIndex && uvIndex <= 5 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-primary p-2 rounded text-white">${uvIndex}</span></li>` :
                                    5 <= uvIndex && uvIndex <= 7 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-info p-2 rounded text-white">${uvIndex}</span></li>` :
                                        7 <= uvIndex && uvIndex <= 10 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-warning p-2 rounded text-dark">${uvIndex}</span></li>` :
                                            cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-danger p-2 rounded text-white">${uvIndex}</span></li>`
                            for (i = 1; i < 6; i++) {
                                const dailyUVIndex = data.daily[i].uvi
                                let dailyUV = "" // conditional expressions that determines colour of UV index to alert user at first glance of UV index for the 5 day forecast
                                0 <= dailyUVIndex && dailyUVIndex <= 3 ? dailyUV = `<li>UV Index: <span class="bg-success p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                    3 <= dailyUVIndex && dailyUVIndex <= 5 ? dailyUV = `<li>UV Index: <span class="bg-info p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                        5 <= dailyUVIndex && dailyUVIndex <= 7 ? dailyUV = `<li>UV Index: <span class="bg-primary p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                            7 <= dailyUVIndex && dailyUVIndex <= 10 ? dailyUV = `<li>UV Index: <span class="bg-warning p-1 rounded text-dark">${dailyUVIndex}</span></li>` :
                                                dailyUV = `<li>UV Index: <span class="bg-danger p-1 rounded text-white">${dailyUVIndex}</span></li>`
                                const eachDayForcast = // list of weather details for the next 5 days
                                    `<div class="col-9 col-md-4 col-xl-2 col-lg-4 bg-dark m-2 p-1 text-white">
                                        <ul class="list-unstyled p-2 d-flex flex-column">
                                            <li><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"/><i>${data.daily[i].weather[0].description}</i></li>
                                            <li><h3>${moment.unix(data.daily[i].dt).format("YYYY-MMM-DD")}</h3></li>
                                            <li>Min Temperature: ${data.daily[i].temp.min}°C</li>
                                            <li>Max Temperature: ${data.daily[i].temp.max}°C</li>
                                            <li>Wind Speed: ${data.daily[i].wind_speed} km/h</li>
                                            <li>Humidity: ${data.daily[i].humidity}%</li>
                                            <li> ${dailyUV}</li>
                                        </ul>
                                    </div>`
                                fiveDayForecastBox.innerHTML += eachDayForcast // adds forecast cards to 5 day forecast card container
                            }
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        }
        )
};

currentWeather() // fill in default city to avoid loading onto a blank page

const savedCities = document.querySelector(".savedCities") // saved cities container
const citySearched = document.querySelector(".citySearch") // input field that pulls the city searched by the user
const savedCity = document.querySelector(".savedCity") // class of created searched city button
const savedCitiesArray = JSON.parse(window.localStorage.getItem("savedCitiesStorage")) || [] // creates an array or pulls an existing one from local storage

const printCities = () => { // prints all previously searched cities from local storage if present
    for (i = 0; i < savedCitiesArray.length; i++) {
        savedCities.innerHTML += savedCitiesArray[i]
    }
}

printCities()
$(".citySearchbtn").click(function () { // when button is clicked
    fiveDayForecastBox.innerHTML = "" // 5 day forecast container is cleared
    currentWeather(citySearched.value) // then currentWeather function is ran with input entered by user
    if (!citySearched.value) {
        return alert("Please enter a city!") // if user did not enter a city, user is prompted by window
    }
    const savedCityBtn = `<button type="button" class="savedCity col-12 p-1 my-2 btn-dark rounded text-capitalize" value="${citySearched.value}">${citySearched.value}</button>`
    if (!savedCitiesArray.includes(savedCityBtn)) { // prevents duplicate cities from being entered to local storage array
        savedCitiesArray.push(savedCityBtn) // if not a duplicate, city input entered by user is pushed to local storage array
        savedCities.innerHTML += savedCitiesArray[savedCitiesArray.length - 1] // prints entered city
        window.localStorage.setItem("savedCitiesStorage", JSON.stringify(savedCitiesArray)); // adds entered city to local storage
    }
    $(".savedCity").click(function(){ // user can created cities to search weather
        fiveDayForecastBox.innerHTML = ""
        currentWeather(this.value)
    })
})

$(".savedCity").click(function(){ // user can created cities to search weather
    fiveDayForecastBox.innerHTML = ""
    currentWeather(this.value)
})


$("#clear").click(function(){
    localStorage.clear(); // clear local storage
})