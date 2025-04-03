'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatCurrency } from '../utils/formatters';

export default function CryptoChart({ priceData, timeframe, color = '#3366FF' }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!priceData || priceData.length === 0) return;
    
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    // Generate time labels based on timeframe
    const generateLabels = () => {
      const now = new Date();
      const labels = [];
      
      switch (timeframe) {
        case '24h':
          // Generate hourly labels for the last 24 hours
          for (let i = 24; i >= 0; i--) {
            const d = new Date(now);
            d.setHours(d.getHours() - i);
            labels.push(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
          break;
        case '7d':
          // Generate daily labels for the last 7 days
          for (let i = 7; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
          }
          break;
        case '30d':
          // Generate labels for the last 30 days (every 5 days)
          for (let i = 30; i >= 0; i -= 5) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
          }
          break;
        case '90d':
          // Generate monthly labels for the last 90 days
          for (let i = 3; i >= 0; i--) {
            const d = new Date(now);
            d.setMonth(d.getMonth() - i);
            labels.push(d.toLocaleDateString([], { month: 'short' }));
          }
          break;
        case '1y':
          // Generate quarterly labels for the last year
          for (let i = 12; i >= 0; i -= 3) {
            const d = new Date(now);
            d.setMonth(d.getMonth() - i);
            labels.push(d.toLocaleDateString([], { month: 'short', year: 'numeric' }));
          }
          break;
        default:
          // Default to 7d
          for (let i = 7; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
          }
      }
      
      return labels;
    };
    
    const labels = generateLabels();
    
    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Price (USD)',
            data: priceData,
            borderColor: color,
            backgroundColor: `${color}1A`, // 10% opacity
            tension: 0.4,
            fill: true,
            pointBackgroundColor: color,
            pointRadius: 0,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            titleColor: '#FFFFFF',
            bodyColor: '#E0E0E0',
            borderColor: '#424242',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function(context) {
                let label = 'Price: ';
                if (context.parsed.y !== null) {
                  label += formatCurrency(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
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
                return formatCurrency(value);
              }
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#9E9E9E',
              maxRotation: 45,
              minRotation: 45
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
  }, [priceData, timeframe, color]);
  
  return (
    <div className="w-full h-72">
      {priceData && priceData.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-light-500">No price data available</p>
        </div>
      )}
    </div>
  );
}
