import React from 'react';

function WeatherLocation(props) {
  return (
    <h2 className="text-white text-4xl font-bold mb-5 font-mono text-center">
      {props.location}
    </h2>
  );
}

export default WeatherLocation;
