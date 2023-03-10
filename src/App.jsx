import axios from 'axios';
import { useState, useEffect } from 'react';
import WeatherTemperature from './components/WeatherTemperature';
import WeatherDescription from './components/WeatherDescription';
import WeatherIcon from './components/WeatherIcon';
import WeatherLocation from './components/WeatherLocation';
import LoadingSpinner from './components/LoadingSpinner';
import CitySearchInput from './components/CitySearchInput';
import './App.css';

function getWeatherByCity(city, apiKey, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  return axios.get(url);
}

function getWeather(lat, lon, apiKey, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  return axios.get(url);
}

function celsiusToFahrenheit(tempCelsius) {
  return (tempCelsius * 9) / 5 + 32;
}
function fahrenheitToCelsius(tempFahrenheit) {
  return ((tempFahrenheit - 32) * 5) / 9;
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
  const [lastCity, setLastCity] = useState('');

  useEffect(() => {
    const apiKey = '46a1839dbee718dbcb24720d9dd3d561';

    getWeatherByCurrentLocation(apiKey, units);
  }, []);

  function getWeatherByCurrentLocation(apiKey, units) {
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
  }

  function handleToggleUnits() {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  }

  function handleCitySearch(city) {
    const apiKey = '46a1839dbee718dbcb24720d9dd3d561';
    setIsLoading(true);

    if (city === lastCity) {
      setIsLoading(false);
      return;
    }

    getWeatherByCity(city, apiKey, units)
      .then((response) => {
        let temp = response.data.main.temp;
        if (units === 'imperial') {
          temp = fahrenheitToCelsius(temp);
        }
        setWeatherData({
          temperature: temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          location: `${response.data.name}, ${response.data.sys.country}`,
        });

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

        setLastCity(city);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <div
      className={`bg-gray-100 min-h-screen flex items-center justify-center ${bgClass}`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full order-first">
            <CitySearchInput onSearch={handleCitySearch} />
          </div>
          <div className="opacity-95 bg-gradient-to-br from-black to-blue-900 rounded-2xl shadow-xl shadow-slate-900 px-10 py-10 m-3 order-last">
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
        </div>
      )}
    </div>
  );
}

export default App;
