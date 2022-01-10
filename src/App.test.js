import { render, screen } from '@testing-library/react'
import Home from './Components/Home'
const info = {
  base: 'stations',
  clouds: { all: 100 },
  cod: 200,
  coord: { lon: -46.7599, lat: -22.7017 },
  dt: 1641820578,
  id: 3472311,
  main: {
    feels_like: 23.51,
    grnd_level: 937,
    humidity: 86,
    pressure: 1012,
    sea_level: 1012,
    temp: 22.92,
    temp_max: 22.92,
    temp_min: 22.92
  },
  name: 'Amparo',
  sys: {
    type: 1,
    id: 8393,
    country: 'BR',
    sunrise: 1641803495,
    sunset: 1641851825
  },
  timezone: -10800,
  visibility: 10000,
  weather: [
    { id: 804, main: 'Clouds', description: 'Nublado', icon: '04d' }
  ],
  wind: { speed: 0.16, deg: 201, gust: 1.04 }
}
describe('Component renders weather info', () => {
  test('Test weather description', () => {

    render(<Home WeatherInfo={info} />)
    const weatherDescription = screen.getByTestId("WeatherDescription");
    expect(weatherDescription.textContent).toBe('Nublado')
  })
  test('Test weather image', () => {

    render(<Home WeatherInfo={info} />)
    const WeatherImage = screen.getByTestId("WeatherImage");
    expect(WeatherImage.src).toBe('https://openweathermap.org/img/wn/04d@2x.png')
  })
})
