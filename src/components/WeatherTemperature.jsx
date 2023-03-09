import React, { useState } from 'react';

function WeatherTemperature(props) {
  const [temperatureC, setTemperatureC] = useState(null);
  const [temperatureF, setTemperatureF] = useState(null);

  // Función para actualizar las temperaturas en ambos grados
  function updateTemperatures(temperature) {
    setTemperatureC(temperature);
    setTemperatureF((temperature * 9) / 5 + 32);
  }

  // Actualizar las temperaturas cuando se renderiza el componente
  if (props.temperature && temperatureC === null) {
    updateTemperatures(props.temperature);
  }

  function handleToggleUnits() {
    if (props.units === 'metric') {
      setTemperatureF((temperatureC * 9) / 5 + 32);
      props.onToggleUnits('imperial');
    } else {
      setTemperatureC((temperatureF - 32) * (5 / 9));
      props.onToggleUnits('metric');
    }
  }

  const temperature = temperatureC
    ? `${temperatureC.toFixed(1)}°C`
    : 'Loading temperature...';
  const temperatureInFahrenheit = temperatureF
    ? `${temperatureF.toFixed(1)}°F`
    : 'Loading temperature...';

  return (
    <div className="text-white text-4xl font-semibold font-mono">
      <div onClick={props.onToggleUnits}>
        {props.units === 'metric' ? temperature : temperatureInFahrenheit}
      </div>
      <button
        className="text-sm text-gray-500 p-1 mt-2 rounded-xl bg-slate-300 hover:bg-slate-500 hover:text-white"
        onClick={handleToggleUnits}
      >
        {props.units === 'metric' ? 'Change to °F' : 'Change to °C'}
      </button>
    </div>
  );
}

export default WeatherTemperature;
