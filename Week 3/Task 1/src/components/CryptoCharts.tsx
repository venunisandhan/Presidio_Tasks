import { useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ScriptableContext } from 'chart.js';
import type { CryptoData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CryptoChartsProps {
  data: CryptoData;
}

export function CryptoCharts({ data }: CryptoChartsProps) {
  const lineChartRef = useRef<ChartJS<"line", number[], string>>(null);
  const barChartRef = useRef<ChartJS<"bar", number[], string>>(null);

  const timeLabels = data.prices.map((point) => {
    const date = new Date(point[0]);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const lineChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Price (USD)',
        data: data.prices.map((point) => point[1]),
        borderColor: '#3b82f6',
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(59, 130, 246, 0.2)';
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
        pointHoverBorderWidth: 3,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Total Volume',
        data: data.total_volumes.map((point) => point[1]),
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#10b981';
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#10b981');
          gradient.addColorStop(1, '#059669');
          return gradient;
        },
        borderRadius: 4,
        hoverBackgroundColor: '#34d399',
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { size: 14, family: 'Inter' },
        bodyFont: { size: 13, family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#64748b',
          callback: (value: any) => {
            if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B';
            if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
            if (value >= 1e3) return '$' + (value / 1e3).toFixed(1) + 'K';
            return '$' + value;
          }
        }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#64748b',
          maxTicksLimit: 10,
        }
      }
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.chartWrapper} className="chart-card">
        <h3 style={styles.chartTitle}>30-Day Price Trend - {data.coinId.toUpperCase()}</h3>
        <div style={styles.canvasContainer}>
          <Line ref={lineChartRef} data={lineChartData} options={commonOptions} />
        </div>
      </div>

      <div style={styles.chartWrapper} className="chart-card">
        <h3 style={styles.chartTitle}>30-Day Trading Volume</h3>
        <div style={styles.canvasContainer}>
          <Bar ref={barChartRef} data={barChartData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
    marginTop: '1rem',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  chartTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.1rem',
    color: '#334155',
    fontWeight: 600,
  },
  canvasContainer: {
    height: '300px',
    width: '100%',
    position: 'relative' as const,
  }
} as const;
