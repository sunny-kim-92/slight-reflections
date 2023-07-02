import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
          yAxisID: 'A',
          data: [25.48, 8.52, 5.08, 15.66, 9.3, 30.94, 15.24],
          fill: false,
          borderColor: 'red',
        },
        {
          label: 'Weekly Rank',
          yAxisID: 'B',
          data: [4, 23, 30, 19, 23, 3, 16],
          fill: false,
          borderColor: 'blue',
        },
      ],
    };
    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Nick Foles Weekly Performance Since 2017 (Full games)',
        fontSize: 18,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0,
              max: 34,
            },
            scaleLabel: {
              display: true,
              labelString: 'Points',
            },
          },
          {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
              reverse: true,
              min: 1,
              max: 35,
            },
            scaleLabel: {
              display: true,
              labelString: 'Weekly Rank',
            },
          },
        ],
      },
    };
    return <Line data={data} options={options}></Line>;
  }
}

export default FolesChart;
