import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
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

class FolesChart extends Component {
  render() {
    const data = {
      labels: [
        '@NYG, 2017 Week 15',
        'OAK, 2017 Week 16',
        'ATL, 2018 Week 1',
        '@TB, 2018 Week 2',
        '@LAR, 2018 Week 15',
        'HOU, 2018 Week 16',
        '@WAS, 2018 Week 17',
      ],
      datasets: [
        {
          label: 'Score (4 pts per Pass TD)',
          data: [25.48, 8.52, 5.08, 15.66, 9.3, 30.94, 15.24],
          fill: false,
          borderColor: 'red',
        },
      ],
    };
    const options = {
      plugins: {
        backgroundPlugin: {
          color: '#1a202c'
        },
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      responsive: true,

      scales: {
        x:
        {
          gridLines: {
            display: false,
          },
          ticks: {
            min: 0,
            color: 'white',
          },
        },
        y:
        {
          grid: {
            color: 'white',
            lineWidth: 0.4
          },
          ticks: {
            color: 'white'
          },
        },
      },
    };
    return <Line data={data} options={options} style={{ borderRadius: `12px` }}></Line>;
  }
}

export default FolesChart;
