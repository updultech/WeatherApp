async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '1bb1192dd6036bc22b8472ffaa5fbc03';

    try {
        // Fetch coordinates
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            throw new Error('Location not found. Please check the city/village name.');
        }
        const { lat, lon } = geoData[0];

        // Fetch weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data.');
        }
        const weatherData = await weatherResponse.json();

        // Display weather data
        document.getElementById('temperature').textContent = `Temperature: ${weatherData.main.temp}°C`;
        document.getElementById('description').textContent = `Description: ${weatherData.weather[0].description}`;
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}
