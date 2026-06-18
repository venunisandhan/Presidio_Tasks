

import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import type { WeatherData } from '../types';


Chart.register(

);

interface WeatherChartsProps {
  data: WeatherData;
}


function formatChartData(weatherData: WeatherData) {
  const timeLabels = weatherData.times.slice(0, 24).map((time) => {
    return time.split('T')[1];
  });

  const temperatureDataset = {
    label: 'Temperature (°C)',
    data: weatherData.temperatures.slice(0, 24),
    borderColor: 'rgb(255, 99, 132)',  
    backgroundColor: 'rgba(255, 99, 132, 0.1)',
    tension: 0.1, 
    borderWidth: 2,
    fill: true, 
  };

  const precipitationDataset = {
    label: 'Precipitation (mm)',
    data: weatherData.precipitation.slice(0, 24),
    backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue bars
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 1,
  };

  return {
    timeLabels,
    temperatureDataset,
    precipitationDataset,
  };
}

export function WeatherCharts({ data }: WeatherChartsProps) {
  const { timeLabels, temperatureDataset, precipitationDataset } =
    formatChartData(data);

  const lineChartData = {
    labels: timeLabels,
    datasets: [temperatureDataset],
  };

  const barChartData = {
    labels: timeLabels,
    datasets: [precipitationDataset],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Weather - ${data.location}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="charts-container" style={styles.container}>
      {/* Line Chart */}
      <div style={styles.chartWrapper}>
        <h3>Temperature Over Time</h3>
        <Line data={lineChartData} options={commonOptions} />
      </div>

      {/* Bar Chart */}
      <div style={styles.chartWrapper}>
        <h3>Precipitation</h3>
        <Bar data={barChartData} options={commonOptions} />
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  chartWrapper: {
    backgroundColor: '#f5f5f5',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
} as const;