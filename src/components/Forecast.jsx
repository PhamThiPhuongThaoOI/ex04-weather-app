import React from 'react';

function Forecast({ forecastData, selectedDay, setSelectedDay }) {
  const getDayLabel = (index) => {
    if (index === 0) return "Today";
    const date = new Date(forecastData.forecastday[index].date);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className='flex flex-row items-center justify-center mt-1 gap-5'>
      {forecastData.forecastday.slice(0, 3).map((day, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center rounded-lg p-7 shadow-lg cursor-pointer 
            ${selectedDay === day.date ? 'bg-white' : ''}`}
          onClick={() => setSelectedDay(day.date)} // Update selected day
          onMouseEnter={(e) => e.currentTarget.classList.add('bg-white')}
          onMouseLeave={(e) => {
            if (selectedDay !== day.date) {
              e.currentTarget.classList.remove('bg-white');
            }
          }}
        >
          <p className='font-bold text-gray-500'>{getDayLabel(index)}</p>
          <img
            src={`https:${day.day.condition.icon}`}
            className='w-16 h-16'
            alt={day.day.condition.text}
          />
          <p className='text-gray-500 text-xs'>Humidity</p>
          <p className='font-bold text-sm mt-2'>{day.day.avghumidity}%</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
