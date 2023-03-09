import React from 'react';

function WeatherDescription(props) {
  return (
    <div className="text-white text-xl mt-7 font-light italic">
      {props.description.toUpperCase()}
    </div>
  );
}

export default WeatherDescription;
