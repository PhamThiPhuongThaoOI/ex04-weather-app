// TimeAndWeatherNow.jsx
import React from 'react';

function TimeAndWeatherNow({ weatherData, selectedDay, timezone, buttonTemp }) { // Thêm props buttonTemp
  const isToday = new Date(selectedDay).toDateString() === new Date().toDateString();
  const selectedForecast = weatherData.forecast.forecastday.find(day => new Date(day.date).toDateString() === new Date(selectedDay).toDateString());
  const currentWeather = isToday ? weatherData.current : selectedForecast ? selectedForecast.day : weatherData.current;
  const condition = isToday ? weatherData.current.condition : selectedForecast ? selectedForecast.day.condition : weatherData.current.condition;

  const convertTemp = (tempF) => {
    return buttonTemp === 'C' ? ((tempF - 32) * 5 / 9).toFixed(1) : tempF;
  };

  const currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });

  const date = new Date(currentTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedTime = `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  const formattedDate = `${weekday}, ${month} ${day}, ${year}`;

  return (
    <div className='flex flex-col ml-5 text-gray-700 text-sm'>
      <div className='mt-12 text-gray-500 text-lg'>{`${formattedTime}, ${formattedDate}`}</div>
      <div className='flex flex-row items-center justify-center mt-5 ml-custom'>
        <img
          src={`https:${condition.icon}`}
          alt={condition.text}
          className='w-24 h-24'
        />
        <p className='font-bold text-3xl'>{convertTemp(isToday ? currentWeather.temp_f : currentWeather.avgtemp_f)}°{buttonTemp}</p>
      </div>
      <div className='font-bold flex text-xl items-center justify-center'>
        {condition.text}
      </div>
      <div className='flex flex-row mt-9 space-x-1.5 gap-10 ml-3'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-500'>Humidity</p>
          <p className='items-center mt-5'>{isToday ? currentWeather.humidity : currentWeather.avghumidity}%</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-gray-500'>Wind speed</p>
          <p className='text-center mt-5'>{isToday ? currentWeather.wind_kph : currentWeather.maxwind_kph} km/h</p>
        </div>
      </div>
    </div>
  );
}

export default TimeAndWeatherNow;
