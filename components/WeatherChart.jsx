'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatDate } from '../utils/formatters';

export default function WeatherChart({ forecast }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!forecast || forecast.length === 0) return;
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Extract temperature and dates data
    const temperatures = forecast.map(day => day.day.avgtemp_c);
    const dates = forecast.map(day => formatDate(day.date));
    
    // Extract min and max temps
    const minTemps = forecast.map(day => day.day.mintemp_c);
    const maxTemps = forecast.map(day => day.day.maxtemp_c);
    
    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Average Temperature (°C)',
            data: temperatures,
            borderColor: '#3366FF',
            backgroundColor: 'rgba(51, 102, 255, 0.1)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#3366FF',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Min Temperature (°C)',
            data: minTemps,
            borderColor: '#40C4FF',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            tension: 0.3,
            fill: false,
            pointBackgroundColor: '#40C4FF',
            pointRadius: 3,
            pointHoverRadius: 5
          },
          {
            label: 'Max Temperature (°C)',
            data: maxTemps,
            borderColor: '#FF5252',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            tension: 0.3,
            fill: false,
            pointBackgroundColor: '#FF5252',
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#9E9E9E',
              font: {
                family: "'Inter', sans-serif",
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            titleColor: '#FFFFFF',
            bodyColor: '#E0E0E0',
            borderColor: '#424242',
            borderWidth: 1,
            padding: 10,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + '°C';
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            grid: {
              color: 'rgba(66, 66, 66, 0.2)',
              drawBorder: false
            },
            ticks: {
              color: '#9E9E9E',
              callback: function(value) {
                return value + '°C';
              }
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#9E9E9E'
            }
          }
        }
      }
    });
    
    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [forecast]);
  
  return (
    <div className="w-full h-72">
      {forecast && forecast.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-light-500">No forecast data available</p>
        </div>
      )}
    </div>
  );
}
