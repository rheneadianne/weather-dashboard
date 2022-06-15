const key = "144388fc324c756c59444081cd06de18"

const currentWeather = (cityName) => {
    cityName = "Barcelona"
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
            const weatherTitle = `${data[0].name} (${currentTime})`
            cityDetailsTitle.innerHTML = weatherTitle
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const weatherImg = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png"/>`
                    cityDetailsTitle.innerHTML = `${weatherImg} ${weatherTitle}`
                    console.log(data)
                    const cityDetailsList = `
                    <li class="list-group-item">Current Temperature: ${data.list[0].main.temp}°C</li>
                    <li class="list-group-item">Feels like: ${data.list[0].main.feels_like}°C</li>
                    <li class="list-group-item">Wind Speed: ${data.list[0].wind.speed} km/h</li>
                    <li class="list-group-item">Humidity: ${data.list[0].main.humidity}%</li>
                    `
                    cityDetails.innerHTML = cityDetailsList
                    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const uvIndex = data.current.uvi
                        0 <= uvIndex && uvIndex <= 2? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-success p-2 rounded text-white">${uvIndex}</span></li>`:
                        3 <= uvIndex && uvIndex <= 5? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-primary p-2 rounded text-white">${uvIndex}</span></li>`:
                        6 <= uvIndex && uvIndex <= 7? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-info p-2 rounded text-white">${uvIndex}</span></li>`:
                        8 <= uvIndex && uvIndex <= 10? cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-warning p-2 rounded text-white">${uvIndex}</span></li>`:
                        cityDetails.innerHTML = cityDetailsList + `<li class="list-group-item">UV Index: <span class="bg-danger p-2 rounded text-white">${uvIndex}</span></li>`
                    })
                }
            )

        }
    )
};


currentWeather()