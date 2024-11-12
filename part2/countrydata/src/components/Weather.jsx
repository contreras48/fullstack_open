import { useEffect, useState } from 'react';
import weatherServices from '../service/weather'

const Weather = ({ lat, lon, capital }) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    weatherServices
      .getWeather(lat, lon)
      .then(data => setWeather(data))

  }, [])

  return (

    !weather
      ? null
      : <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>

  )

}

export default Weather;