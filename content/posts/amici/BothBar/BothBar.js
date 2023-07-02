import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
      title: {
        display: true,
        text: 'Cases in which States Filed for both Petitioner and Respondent',
        fontSize: 18,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Case',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'Total Amicus Briefs Filed',
            },
          },
        ],
      },
    };
    return <Bar data={info} options={options} />;
  }
}

export default BothBar;
