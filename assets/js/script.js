const key = "144388fc324c756c59444081cd06de18"

const currentWeather = (cityName = "Toronto") => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const cityDetailsTitle = document.querySelector(".cityDetailsTitle")
            const cityDetails = document.querySelector(".cityDetails")
            let currentTime = moment().format("YYYY-MMM-DD")
            lat = data[0].lat
            lon = data[0].lon
            if (lat === undefined || lon === undefined) {
                return 
            }
            savedCities.append(citySearched.value)
            const weatherTitle = `${data[0].name} (${currentTime})`
            cityDetailsTitle.innerHTML = weatherTitle
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const weatherImg = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png"/>`
                    cityDetailsTitle.innerHTML = `${weatherImg} ${weatherTitle}`
                    const cityDetailsList = `
                    <li class="list-group-item">Current Temperature: ${data.list[0].main.temp}°C</li>
                    <li class="list-group-item">Feels like: ${data.list[0].main.feels_like}°C</li>
                    <li class="list-group-item">Wind Speed: ${data.list[0].wind.speed} km/h</li>
                    <li class="list-group-item">Humidity: ${data.list[0].main.humidity}%</li>
                    `
                    cityDetails.innerHTML = cityDetailsList
                    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            const uvIndex = data.current.uvi
                            0 <= uvIndex && uvIndex <= 2 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-success p-2 rounded text-white">${uvIndex}</span></li>` :
                                3 <= uvIndex && uvIndex <= 5 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-primary p-2 rounded text-white">${uvIndex}</span></li>` :
                                    6 <= uvIndex && uvIndex <= 7 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-info p-2 rounded text-white">${uvIndex}</span></li>` :
                                        8 <= uvIndex && uvIndex <= 10 ? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-warning p-2 rounded text-dark">${uvIndex}</span></li>` :
                                            cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-danger p-2 rounded text-white">${uvIndex}</span></li>`

                            const fiveDayForecastBox = document.querySelector(".fiveDayForecastBox")
                            for (i = 1; i < 6; i++) {
                                const dailyUVIndex = data.daily[i].uvi
                                let dailyUV = ""
                                0 <= dailyUVIndex && dailyUVIndex <= 3 ? dailyUV =`<li>UV Index: <span class="bg-success p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                    3 <= dailyUVIndex && dailyUVIndex <= 5 ? dailyUV = `<li>UV Index: <span class="bg-info p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                        5 <= dailyUVIndex && dailyUVIndex <= 7 ? dailyUV = `<li>UV Index: <span class="bg-primary p-1 rounded text-white">${dailyUVIndex}</span></li>` :
                                            7 <= dailyUVIndex && dailyUVIndex <= 10 ? dailyUV = `<li>UV Index: <span class="bg-warning p-1 rounded text-dark">${dailyUVIndex}</span></li>` :
                                            dailyUV = `<li>UV Index: <span class="bg-danger p-1 rounded text-white">${dailyUVIndex}</span></li>`
                                const eachDayForcast = 
                                `<div class="col-9 col-md-4 col-xl-2 col-lg-4 bg-dark m-2 p-1 text-white">
                                    <ul class="list-unstyled p-2 d-flex flex-column">
                                        <li><img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"/>
                                        <li><h3>${moment.unix(data.daily[i].dt).format("YYYY-MMM-DD")}</h3></li>
                                        <li>Min Temperature: ${data.daily[i].temp.min}°C</li>
                                        <li>Max Temperature: ${data.daily[i].temp.max}°C</li>
                                        <li>Wind Speed: ${data.daily[i].wind_speed} km/h</li>
                                        <li>Humidity: ${data.daily[i].humidity}%</li>
                                        <li> ${dailyUV}</li>
                                    </ul>
                                </div>`
                                fiveDayForecastBox.innerHTML += eachDayForcast
                            }
                        })
                }
                )

        }
        )
};

currentWeather()

const savedCities = document.querySelector(".savedCities")
const citySearched = document.querySelector(".citySearch")

$(".citySearchbtn").click(function(){
    currentWeather(citySearched.value)
})