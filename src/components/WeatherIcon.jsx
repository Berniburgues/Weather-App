const iconMapping = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'cloud-sun',
  '02n': 'cloud-moon',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloud',
  '04n': 'cloud',
  '09d': 'cloud-showers-heavy',
  '09n': 'cloud-showers-heavy',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'bolt',
  '11n': 'bolt',
  '13d': 'snowflake',
  '13n': 'snowflake',
  '50d': 'smog',
  '50n': 'smog',
};
function WeatherIcon(props) {
  const icon = iconMapping[props.icon];
  return (
    <div className="flex items-center justify-center ml-11">
      {props.icon && <i className={`fas fa-${icon} text-6xl text-gray-400`}></i>}
    </div>
  );
}

export default WeatherIcon;
