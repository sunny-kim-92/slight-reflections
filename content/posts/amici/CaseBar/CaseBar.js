import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class CaseBar extends Component {
  render() {
    const c2 = '#a8f0f6';
    const c3 = '#eab5b5';
    const c4 = '#aca7ea';
    const c5 = '#beeeba';
    const makeRepeated = (arr, repeats) =>
      Array.from({ length: repeats }, () => arr).flat();

    const colorArr = makeRepeated([c2, c3, c4, c5], 13);
    const info = {
      labels: [
        'Madison v Alabama',
        'Garza v Idaho',
        'Virginia Uranium v Warren',
        ['PDR Network, LLC v.', 'Carlton & Harris Chiropractic Inc.'],
        'McDonough v. Smith',
        [
          'Dept. of Commerce v. U.S. District Court',
          'for the Southern District of New York',
        ],
        'US v Haymond',
        ['Tennessee Wine & Spirits', 'Retailers Association v. Blair'],
        ['The American Legion v.', 'American Humanist Association'],
        'Herrera v Wyoming',
        'Carpenter v Murphy',
        'Bucklew v Precythe',
        'Merck Sharp & Dohme Corp. v. Albrecht',
        'Taggart v Lorenzen',
        'Sturgeon v Frost',
        'Franchise Tax Board of California v Hyatt',
        ['Weyerhaeuser Company v.', 'U.S. Fish and Wildlife Service'],
        [
          'North Carolina Dept. of Revenue v.',
          'Kimberley Rice Kaestner 1992 Family Trust',
        ],
        'New Prime, Inc. v Oliveira',
        'Mitchell v Wisconsin',
        'Frank v Gaos',
        'Apple v Pepper',
        'Department of Commerce v. New York',
        'Cochise Consultancy Inc. v. U.S., ex rel. Hunt',
        'Rucho v. Common Cause',
        ['Washington State Department of Licensing v.', 'Cougar Den Inc.'],
        'Kisor v Wilkie',
        'Knick v. Township of Scott, Pennsylvania',
      ],
      datasets: [
        {
          backgroundColor: colorArr,
          label: 'Total Amicus Filings',
          data: [
            14,
            14,
            10,
            6,
            7,
            15,
            19,
            36,
            30,
            6,
            10,
            17,
            23,
            27,
            10,
            46,
            20,
            25,
            12,
            18,
            31,
            19,
            11,
            20,
            32,
            12,
            16,
            20,
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Supreme Court Cases by Total Amicus Briefs Filed from States',
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
              lineHeight: 0.9,
            },
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

export default CaseBar;
