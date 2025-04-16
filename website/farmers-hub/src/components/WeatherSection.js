import { useState, useEffect } from "react";
import axios from "axios";

function WeatherSection() {
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
      const city = "Delhi";
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        suggestCrops(response.data.main.temp, response.data.weather[0].main);
      } catch (error) {
        setWeather({ error: "Unable to fetch weather data." });
      }
    };
    fetchWeather();
  }, []);

  const suggestCrops = (temp, condition) => {
    if (temp > 25 && condition.includes("Clear")) {
      setSuggestions("Recommended: Cotton, Rice, Sugarcane");
    } else if (temp > 15 && temp <= 25) {
      setSuggestions("Recommended: Wheat, Barley, Mustard");
    } else {
      setSuggestions("Recommended: Potatoes, Peas, Carrots");
    }
  };

  return (
    <section id="weather" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Weather & Crop Suggestions
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Current Weather</h3>
            <div className="bg-gray-100 p-4 rounded">
              {weather?.error ? (
                <p>{weather.error}</p>
              ) : weather ? (
                <>
                  <p>
                    <strong>City:</strong> {weather.name}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {weather.main.temp}°C
                  </p>
                  <p>
                    <strong>Condition:</strong> {weather.weather[0].description}
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Suggested Crops</h3>
            <div className="bg-gray-100 p-4 rounded">
              <p>{suggestions || "Loading suggestions..."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherSection;
