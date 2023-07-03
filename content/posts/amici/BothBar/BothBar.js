import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

const backgroundPlugin = {
  id: 'backgroundPlugin',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#1a202c';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

Chart.register(backgroundPlugin, ...registerables);

class BothBar extends Component {
  render() {
    const info = {
      labels: [
        [
          'North Carolina',
          'Department of Revenue',
          'v. The Kimberly Rice',
          'Kaestner 1992 Family Trust',
        ],
        'Frank v. Gaos',
        'Rucho v. Common Cause',
        'Knick v. Township of Scott, PA',
      ],
      datasets: [
        {
          backgroundColor: 'blue',
          label: 'Petitioner',
          data: [4, 12, 10, 18],
        },
        {
          backgroundColor: 'red',
          label: 'Respondent',
          data: [21, 19, 22, 2],
        },
      ],
    };

    const options = {
      plugins: {
        backgroundPlugin: {
          color: '#1a202c',
        },
        legend: {
          labels: {
            color: 'white'
          }
        },
      },
      scales: {
        y: {
          grid: {
            color: 'white',
            lineWidth: 0.4
          },
          ticks: {
            color: 'white'
          },
        },
        x:
        {
          gridLines: {
            display: false,
          },
          ticks: {
            min: 0,
            color: 'white'
          },
          scaleLabel: {
            display: true,
            labelString: 'Total Amicus Briefs Filed',
          },
        },
      },
    };
    return <Bar data={info} options={options} style={{ borderRadius: `12px` }} />;
  }
}

export default BothBar;
