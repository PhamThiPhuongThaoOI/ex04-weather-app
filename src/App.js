import React, { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import WeatherContainer from './components/WeatherContainer';
import './App.css';

function App() {
  const [city, setCity] = useState('Hanoi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Khởi tạo selectedDay là null
  const [timezone, setTimezone] = useState(null);
  const [buttonTemp, setButtonTemp] = useState('F'); 
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=yes`);
        const data = await response.json();
        setWeatherData(data);
        setForecastData(data.forecast);
        setTimezone(data.location.tz_id);

        // Cập nhật selectedDay sau khi dữ liệu thời tiết được tải
        if (data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0) {
          setSelectedDay(data.forecast.forecastday[0].date); // Đặt selectedDay là ngày đầu tiên trong dự báo
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey, city]);

  if (!weatherData || !forecastData || !selectedDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-10 bg-gradient-to-br from-blue-400 to-pink-200 h-fit shadow-xl shadow-pink-400 rounded-lg">
      <Inputs setCity={setCity} buttonTemp={buttonTemp} setButtonTemp={setButtonTemp} /> 
      <WeatherContainer 
        weatherData={weatherData} 
        forecastData={forecastData} 
        selectedDay={selectedDay} 
        setSelectedDay={setSelectedDay} 
        timezone={timezone}
        buttonTemp={buttonTemp}
      />
    </div>
  );
}

export default App;
