// WeatherCard.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function WeatherCard({ weatherData, selectedDay, buttonTemp }) { // Thêm props buttonTemp
  const [unit, setUnit] = useState("Temperature");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (weatherData && weatherData.forecast) {
      const selectedForecast = weatherData.forecast.forecastday.find(day => new Date(day.date).toDateString() === new Date(selectedDay).toDateString());
      const hourlyData = selectedForecast ? selectedForecast.hour : weatherData.forecast.forecastday[0].hour;

      const labels = hourlyData.map(hour => {
        const date = new Date(hour.time);
        return date.getHours() + ':00';
      });

      const temperatures = hourlyData.map(hour => buttonTemp === 'C' ? ((hour.temp_f - 32) * 5 / 9).toFixed(1) : hour.temp_f); // Chuyển đổi nhiệt độ
      const humidities = hourlyData.map(hour => hour.humidity);
      const uvIndexes = hourlyData.map(hour => hour.uv);

      const getDataSet = (unit) => {
        switch (unit) {
          case "Temperature":
            return {
              labels,
              datasets: [
                {
                  label: `Temperature (°${buttonTemp})`,
                  data: temperatures,
                  fill: true,
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  borderColor: 'rgba(75,192,192,1)',
                  pointRadius: 0,
                },
              ],
              color: 'rgba(75,192,192,1)',
            };
          case "Humidity":
            return {
              labels,
              datasets: [
                {
                  label: 'Humidity (%)',
                  data: humidities,
                  fill: true,
                  backgroundColor: 'rgb(194, 255, 188)',
                  borderColor: 'rgb(169, 234, 166)',
                  pointRadius: 0, 
                },
              ],
              color: '#28a745',
            };
          case "Ultraviolet":
            return {
              labels,
              datasets: [
                {
                  label: 'Ultraviolet Index',
                  data: uvIndexes,
                  fill: true,
                  backgroundColor: 'rgb(255, 255, 123)',
                  borderColor: 'rgb(231, 230, 171)',
                  pointRadius: 0, 
                },
              ],
              color: '#f39c12',
            };
          default:
            return {};
        }
      };

      const dataSet = getDataSet(unit);
      setChartData({
        ...dataSet,
        datasets: dataSet.datasets.map(dataset => ({
          ...dataset,
          datalabels: {
            display: true,
            align: 'top',
            anchor: 'end',
            color: dataSet.color,
            font: {
              weight: 'bold',
              size: 14,
            },
            formatter: function(value, context) {
              const labelHour = parseInt(context.chart.data.labels[context.dataIndex]);
              if (labelHour === new Date().getHours()) {
                if (unit === "Temperature") {
                  return `${value} °${buttonTemp}`;
                } else if (unit === "Humidity") {
                  return `${value} %`;
                } else if (unit === "Ultraviolet") {
                  return `${value}`;
                }
              }
              return null;
            }
          },
        })),
      });
    }
  }, [weatherData, unit, selectedDay, buttonTemp]); // Thêm buttonTemp vào dependency array

  const handleChangeUnit = () => {
    if (unit === "Temperature") {
      setUnit("Humidity");
    } else if (unit === "Humidity") {
      setUnit("Ultraviolet");
    } else if (unit === "Ultraviolet") {
      setUnit("Temperature");
    }
  };

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="bg-white shadow-lg h-41 rounded-tl-lg rounded-tr-lg">
      <button className="bg-white text-gray-700 rounded-lg" onClick={handleChangeUnit}>
        {unit}
      </button>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            datalabels: chartData.datasets?.[0]?.datalabels,
          },
          elements: {
            line: {
              tension: 0.5,
            },
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
            },
          },
          interaction: {
            mode: 'x',
            intersect: false,
          },
          animation: {
            duration: 0,
          },
        }}
        height={120}
        width={300}
      />
    </div>
  );
}

export default WeatherCard;
