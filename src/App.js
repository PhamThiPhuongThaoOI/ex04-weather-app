// App.js
import React, { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import WeatherContainer from './components/WeatherContainer';
import './App.css';

function App() {
  const [city, setCity] = useState('Hanoi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]);
  const [timezone, setTimezone] = useState(null);
  const [buttonTemp, setButtonTemp] = useState('F'); // Thêm trạng thái buttonTemp
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log('API Key:', apiKey);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=yes`);
        const data = await response.json();
        setWeatherData(data);
        setForecastData(data.forecast);
        setTimezone(data.location.tz_id);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey, city]);

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-10 bg-gradient-to-br from-blue-400 to-pink-200 h-fit shadow-xl shadow-pink-400 rounded-lg">
      <Inputs setCity={setCity} buttonTemp={buttonTemp} setButtonTemp={setButtonTemp} /> {/* Thêm buttonTemp và setButtonTemp */}
      <WeatherContainer 
        weatherData={weatherData} 
        forecastData={forecastData} 
        selectedDay={selectedDay} 
        setSelectedDay={setSelectedDay} 
        timezone={timezone}
        buttonTemp={buttonTemp} // Truyền buttonTemp vào WeatherContainer
      />
    </div>
  );
}

export default App;
