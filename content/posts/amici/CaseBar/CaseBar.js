import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

class CaseBar extends Component {
  render() {
    const c2 = "#a8f0f6";
    const c3 = "#eab5b5";
    const c4 = "#aca7ea";
    const c5 = "#beeeba";
    const makeRepeated = (arr, repeats) =>
      Array.from({ length: repeats }, () => arr).flat();

    const colorArr = makeRepeated([c2, c3, c4, c5], 13);
    const info = {
      labels: [
        "Sackett v. Environmental Protection Agency",
        "Allen v. Milligan",
        "National Pork Producers Council v. Ross",
        "Reed v. Goertz",
        "Helix Energy Solutions Group v. Hewitt",
        "Students for Fair Admissions Inc. v. President & Fellows of Harvard College",
        "Mallory v. Norfolk Southern Railway Co.",
        "Health and Hospital Corporation of Marion County, Indiana v. Talevski",
        "Haaland v. Brackeen",
        "U.S. v. Texas",
        "303 Creative LLC v. Elenis",
        "Moore v. Harper",
        "Ohio Adjutant General’s Department v. Federal Labor Relations Authority",
        "Glacier Northwest v. Int'l Brotherhood of Teamsters",
        "Department of Education v. Brown",
        "New York v. New Jersey",
        "U.S. v. Hansen",
        "Samia v. U.S.",
        "Groff v. DeJoy",
        "U.S. ex rel. Schutte v. SuperValu Inc.",
        "Counterman v. Colorado",
        "Tyler v. Hennepin County, Minnesota"
      ],
      datasets: [
        {
          backgroundColor: colorArr,
          label: "Total Amicus Filings",
          data: [40,
            14,
            41,
            10,
            6,
            33,
            8,
            22,
            26,
            36,
            37,
            35,
            12,
            16,
            39,
            9,
            25,
            32,
            28,
            33,
            26,
            11
          ],
        },
      ],
    };

    const options = {
      plugins: {
        backgroundPlugin: {
          color: "#1a202c",
        },
        legend: {
          labels: {
            color: "white"
          }
        },
      },
      scales: {
        x:
        {
          gridLines: {
            display: false,
          },
          ticks: {
            min: 0,
            color: "white",
            font: {
              size: 9
            }
          },
        },
        y:
        {
          grid: {
            color: "white",
            lineWidth: 0.4
          },
          ticks: {
            color: "white"
          },
        },
      },
    };

    return <Bar data={info} options={options} style={{ marginTop: `12px`, borderRadius: `12px` }} />;
  }
}

export default CaseBar;
