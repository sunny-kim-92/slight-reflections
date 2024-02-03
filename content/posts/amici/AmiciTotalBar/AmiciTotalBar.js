import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class AmiciTotalBar extends Component {
  render() {
    const c2 = '#a8f0f6';
    const c3 = '#eab5b5';
    const c4 = '#aca7ea';
    const c5 = '#beeeba';
    const makeRepeated = (arr, repeats) =>
      Array.from({ length: repeats }, () => arr).flat();

    const colorArr = makeRepeated([c2, c3, c4, c5], 13);
    const data = {
      labels: [
        'Texas',
        'Louisiana',
        'Indiana',
        'Nebraska',
        'South Carolina',
        'Oklahoma',
        'Arkansas',
        'Kansas',
        'Georgia',
        'Utah',
        'Alabama',
        'Michigan',
        'Idaho',
        'South Dakota',
        'Rhode Island',
        'Colorado',
        'Wyoming',
        'Ohio',
        'Montana',
        'California',
        'Washington',
        'Florida',
        'Oregon',
        'Minnesota',
        'Alaska',
        'North Dakota',
        'New Jersey',
        'Massachusetts',
        'Maryland',
        'Iowa',
        'Connecticut',
        'Pennsylvania',
        'Arizona',
        'Illinois',
        'Wisconsin',
        'Mississippi',
        'New York',
        'West Virginia',
        'Vermont',
        'North Carolina',
        'Nevada',
        'District of Columbia',
        'Missouri',
        'Hawaii',
        'Kentucky',
        'Virginia',
        'Tennessee',
        'Maine',
        'Delaware',
        'New Mexico',
        'New Hampshire',
      ],
      datasets: [
        {
          backgroundColor: colorArr,
          label: 'Total Amicus Filings',
          data: [
            14,
            11,
            10,
            15,
            9,
            10,
            13,
            10,
            11,
            7,
            8,
            8,
            9,
            11,
            9,
            6,
            10,
            11,
            15,
            12,
            10,
            12,
            9,
            12,
            15,
            7,
            15,
            10,
            12,
            9,
            13,
            10,
            10,
            7,
            5,
            9,
            15,
            14,
            9,
            9,
            14,
            9,
            9,
            13,
            19,
            9,
            9,
            11,
            13,
            6,
            6
          ],
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
      responsive: true,
      scales: {
        y:
        {
          grid: {
            color: 'white',
            lineWidth: 0.4
          },
          ticks: {
            fontSize: 10,
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
            color: 'white',
            font: {
              size: 9
            }
          },
        },
      },
    };

    return <Bar data={data} options={options} style={{ borderRadius: `12px` }} />;
  }
}

export default AmiciTotalBar;
