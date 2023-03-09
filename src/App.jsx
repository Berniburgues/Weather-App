import axios from 'axios';
import { useState, useEffect } from 'react';
import WeatherTemperature from './components/WeatherTemperature';
import WeatherDescription from './components/WeatherDescription';
import WeatherIcon from './components/WeatherIcon';
import WeatherLocation from './components/WeatherLocation';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function getWeather(lat, lon, apiKey, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  return axios.get(url);
}
function celsiusToFahrenheit(tempCelsius) {
  return (tempCelsius * 9) / 5 + 32;
}

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    description: null,
    icon: null,
    location: null,
  });
  const [units, setUnits] = useState('metric');
  const [isLoading, setIsLoading] = useState(true);
  const [bgClass, setBgClass] = useState('');

  useEffect(() => {
    const apiKey = '46a1839dbee718dbcb24720d9dd3d561';
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getWeather(lat, lon, apiKey, units).then((response) => {
        const tempCelsius = response.data.main.temp;
        const temperature =
          units === 'imperial' ? celsiusToFahrenheit(tempCelsius) : tempCelsius;
        setWeatherData({
          temperature: temperature,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          location: `${response.data.name}, ${response.data.sys.country}`,
        });
        setIsLoading(false);

        const conditions = response.data.weather[0].main;
        switch (conditions) {
          case 'Clear':
            setBgClass('bg-clear');
            break;
          case 'Clouds':
            setBgClass('bg-clouds');
            break;
          case 'Rain':
          case 'Drizzle':
          case 'Thunderstorm':
            setBgClass('bg-rain');
            break;
          case 'Snow':
            setBgClass('bg-snow');
            break;
          default:
            setBgClass('');
        }
      });
    });
  }, [units]);

  function handleToggleUnits() {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  }

  return (
    <div
      className={`bg-gray-100 min-h-screen flex items-center justify-center ${bgClass}`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="opacity-95 bg-gradient-to-br from-black to-blue-900 rounded-2xl shadow-xl shadow-slate-900 px-10 py-10 m-3">
          <WeatherLocation location={weatherData.location} />
          <div className="flex items-center justify-between">
            <WeatherTemperature
              temperature={weatherData.temperature}
              units={units}
              onToggleUnits={handleToggleUnits}
            />
            <WeatherIcon icon={weatherData.icon} />
          </div>
          <WeatherDescription description={weatherData.description} />
        </div>
      )}
    </div>
  );
}

export default App;
