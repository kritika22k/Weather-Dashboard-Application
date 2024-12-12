const apiKey = "6406ca836e96fe35d13d0645f945ad0b"; // Replace with your OpenWeatherMap API key

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherContainer = document.getElementById("weatherContainer");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const historyContainer = document.getElementById("historyContainer");

// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
        updateSearchHistory(city);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    weatherContainer.classList.remove("d-none");
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Function to manage search history
function updateSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("weatherHistory", JSON.stringify(history));
        renderHistory();
    }
}

// Function to render search history
function renderHistory() {
    historyContainer.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    history.forEach((city) => {
        const button = document.createElement("button");
        button.textContent = city;
        button.classList.add("btn", "btn-secondary", "m-1");
        button.addEventListener("click", () => fetchWeather(city));
        historyContainer.appendChild(button);
    });
}

// Event Listener for Search Button
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = "";
    } else {
        alert("Please enter a city name.");
    }
});

// Load history on page load
renderHistory();
