import React from 'react'
import axios from'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lat, lon,}) => {   

  const [weather, setWeather] = useState()
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(lat){
     const APIKey = '4578e7069a023cd71000d151ebffdd83'
     const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

     axios.get(URL)
        .then(res => {
            setWeather(res.data)
            const temp ={
                celsius: `${Math.round(res.data.main.temp -273.15)} °C`,
                farenheit: `${Math.round((res.data.main.temp -273.15)* 9 / 5 + 32)} °F`,
            }
            setTemperture(temp)
            setIsLoading(false)
        }
            )
        .catch(err => console.log(err))
    }
  },[lat, lon])

  console.log(weather);

  const handleClick =() => setIsCelsius (!isCelsius)

  if(isLoading){

    return <LoadingScreen/>

  }else{

    return (
        <article className="card">

            <h1 >Weather App</h1>
            <h2> {`${weather?.name}, ${weather?.sys.country}`} </h2>
            <div>
                <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="icon" />
                <div>
                    <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                    <ul>
                        <li><span>Wind Speed </span> {weather?.wind.speed} m/s</li>
                        <li><span>Clouds </span> {weather?.clouds.all} %</li>
                        <li><span>Presure </span> {weather?.name.presure} hpa</li>
                    </ul>
                </div>
            </div>
            <h2>{isCelsius? temperture?.celsius : temperture?.farenheit }</h2>
            <button className ='btn' onClick={handleClick}>{isCelsius ? 'change of °F':'change of °C' }</button>
        </article>
      )
  }
  

  
}

export default CardWeather