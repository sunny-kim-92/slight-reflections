import Chart from 'react-google-charts';
import React, { Component } from 'react';
import { Container } from './sankeychart.css.js';

class SankeyChart extends Component {
  render() {
    return (
      <Container>
        <Chart
          height={'80vh'}
          chartType="Sankey"
          data={[
            ['From', 'To', 'Net Cases Against'],
            ['Texas', 'California', 2],
            ['Texas', 'Washington', 1],
            ['Texas', 'Oregon', 2],
            ['Texas', 'Minnesota', 3],
            ['Texas', 'Iowa', 1],
            ['Texas', 'Connecticut', 1],
            ['Texas', 'New York', 1],
            ['Texas', 'Vermont', 1],
            ['Texas', 'District of Columbia', 2],
            ['Texas', 'New Mexico', 2],
            ['South Carolina', 'California', 1],
            ['South Carolina', 'New York', 1],
            ['South Carolina', 'New Mexico', 1],
            ['Oklahoma', 'Massachusetts', 1],
            ['Oklahoma', 'New York', 2],
            ['Oklahoma', 'Vermont', 1],
            ['Oklahoma', 'Maine', 1],
            ['Oklahoma', 'New Mexico', 2],
            ['Arkansas', 'Oregon', 1],
            ['Arkansas', 'New York', 1],
            ['Arkansas', 'New Mexico', 1],
            ['Georgia', 'New York', 1],
            ['Georgia', 'New Mexico', 1],
            ['Alabama', 'New York', 1],
            ['Alabama', 'New Mexico', 1],
            ['Ohio', 'New Mexico', 1],
            ['Alaska', 'New York', 1],
            ['Arizona', 'New York', 1],
            ['Illinois', 'Nevada', 1],
            ['Missouri', 'New York', 1],
          ]}
          options={{
            title: 'State Pairs with Net Negative Amicus Scores',
          }}
        />
      </Container>
    );
  }
}

export default SankeyChart;
