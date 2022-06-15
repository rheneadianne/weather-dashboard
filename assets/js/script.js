const key = "144388fc324c756c59444081cd06de18"
let ohYouKnow = document.querySelector(".savedCities")

const test = (cityName) => {
    cityName = "london"
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            ohYouKnow.innerHTML = data[0].lat + " " + data[0].lon
            latitude = data[0].lat
            longtitude = data[0].lon
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    ohYouKnow.innerHTML = data.name
                    console.log(data)
                }
                )
        }
        )
};

const text = (latitude, longtitude) => {

};

test()
text()