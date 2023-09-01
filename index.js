const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")

search.addEventListener("click", () => {
  const APIKey = "c1607a7ec443b5bdc23cd557e66f4dda"
  const city = document.querySelector(".search-box input").value

  if (city === "") {
    return
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px"
        weatherBox.style.display = "none"
        weatherDetails.style.display = "none"
        error404.style.display = "block"
        error404.classList.add("fadeIn")
        return
      }

      error404.style.display = "none"
      error404.classList.remove("fadeIn")

      const image = document.querySelector(".weather-box img")
      const temperature = document.querySelector(".weather-box .temperature")
      const description = document.querySelector(".weather-box .description")
      const humidity = document.querySelector(".weather-details .humidity span")
      const wind = document.querySelector(".weather-details .wind span")
      const feelsLike = document.querySelector(".feels-like")
      const tempMin = document.querySelector(".temp-min")
      const tempMax = document.querySelector(".temp-max")
      const pressure = document.querySelector(".pressure")

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png"
          break
        case "Clouds":
          image.src = "images/cloud.png"
          break

        case "Haze":
          image.src = "images/mist.png"
          break

        case "Rain":
          image.src = "images/rain.png"
          break
        case "Snow":
          image.src = "images/snow.png"
          break

        default:
          image.src = ""
          break
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}°C`
      description.innerHTML = `${json.weather[0].description}`

      feelsLike.innerHTML = `${parseInt(json.main.feels_like)} °C`
      tempMin.innerHTML = `${json.main.temp_min} °C`
      tempMax.innerHTML = `${json.main.temp_max} °C`
      pressure.innerHTML = `${json.main.pressure} bar`

      humidity.innerHTML = `${json.main.humidity}%`
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`

      weatherBox.style.display = ""
      weatherDetails.style.display = ""
      weatherBox.classList.add("fadeIn")
      weatherDetails.classList.add("fadeIn")
      container.style.height = "auto"
    })
})
