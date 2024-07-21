// WeatherContainer.jsx
import React from 'react';
import TimeAndWeatherNow from './TimeAndWeatherNow';
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';

function WeatherContainer({ weatherData, forecastData, selectedDay, setSelectedDay, timezone, buttonTemp }) { // Thêm props buttonTemp
  return (
    <div className="flex justify-between items-start space-x-4 w-full">
      <TimeAndWeatherNow 
        weatherData={weatherData} 
        selectedDay={selectedDay} 
        timezone={timezone}
        buttonTemp={buttonTemp} // Truyền buttonTemp vào TimeAndWeatherNow
      />
      <div className="flex flex-col space-y-4 w-3/5">
        <WeatherCard 
          weatherData={weatherData} 
          selectedDay={selectedDay} 
          buttonTemp={buttonTemp} // Truyền buttonTemp vào WeatherCard
        />
        <Forecast 
          forecastData={forecastData} 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
        />
      </div>
    </div>
  );
}

export default WeatherContainer;
