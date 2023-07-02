import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class AmiciTotalBar extends Component {
  constructor(props) {
    super(props);
  }

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
            22,
            22,
            21,
            17,
            17,
            16,
            16,
            15,
            14,
            14,
            13,
            13,
            13,
            12,
            12,
            12,
            11,
            11,
            11,
            10,
            10,
            10,
            10,
            10,
            10,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            9,
            8,
            8,
            8,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            7,
            6,
            6,
            5,
            5,
            3,
            0,
          ],
        },
      ],
    };

    const options = {
      title: {
        display: true,
        text: 'States by Total Amicus Briefs Filed',
        fontSize: 18,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontSize: 10,
            },
            scaleLabel: {
              display: true,
              labelString: 'State',
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

    return <Bar data={data} options={options} />;
  }
}

export default AmiciTotalBar;
