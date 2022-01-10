import React, { useEffect, useState } from 'react'
import * as s from './Home.module.scss'
import Button from '@mui/material/Button';

const Home = (props) => {
  const [currentLocation, setCurrentLocation] = useState({})
  const [error, setError] = useState(null)
  const [WeatherInfo, setWeatherInfo] = useState(null)

  const onError = error => {
    setError(error.message)
  }
  const onChange = ({ coords }) => {
    console.log(coords)
    setCurrentLocation(coords)
    getWeatherInfo(coords)
  }

  const getWeatherInfo = (coords) => {
    console.log(process.env.REACT_APP_OPENWEATHERMAP_TOKEN)
    console.log(process.env)

    if (coords.latitude && coords.longitude)
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_TOKEN}&lang=pt_br&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          setWeatherInfo(data);
        })
  }
  const gePosition = () => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    geo.getCurrentPosition(onChange)
  }

  useEffect(() => {
    gePosition();
  }, [])
  
  useEffect(() => {
    if (props) {
      if (props.currentLocation)
        setCurrentLocation(props.currentLocation)
      if (props.WeatherInfo)
        setWeatherInfo(props.WeatherInfo)
    }
  }, [props])


  return (<div className={s.Home}>
    {WeatherInfo ? <>
      <div className={s.card_weather}>
        <div className={s.cardHeader}>
          <div className={s.leftSide}>
            {WeatherInfo['name']}
          </div>
          <div className={s.rightSide}>
            <Button variant="outlined" size="small" onClick={() => getWeatherInfo(currentLocation)}>Atualizar</Button>
          </div>
        </div>

        <div className={s.card_weatherInformations}>

          <div className={s.group_pic_temp}>
            <div className={s.pic}>
              <img data-testid='WeatherImage'  className="wob_tci" alt="Clear with periodic clouds"
                src={`https://openweathermap.org/img/wn/${WeatherInfo['weather'][0].icon}@2x.png`} id="wob_tci" data-atf="1" data-frt="0">
              </img>
            </div>
            <div className={s.Temperature}>
              <div className={s.Value}>
                {WeatherInfo['main'].temp}
              </div>
              <div className={s.Unit}>
                ºC
              </div>
            </div>
          </div>
          <div className={s.group_rain}>
            <span data-testid='WeatherDescription' className={s.description}>{(WeatherInfo['weather'][0].description)}</span>
            {WeatherInfo['rain'] ? (<span>Precipitation (last 1 hour): {WeatherInfo['rain']['1h']}%</span>) : <></>}
            <span>Humidity: {WeatherInfo['main'].humidity}%</span>
            <span>Wind: {Math.round(WeatherInfo['wind'].speed * 3.6)}km/h</span>
          </div>
        </div>
      </div></> : <></>}
  </div>)
}
export default Home;
