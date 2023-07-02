/* eslint react/prop-types: 0 */
import React from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { data } from './data';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';

const theme = createTheme({
  palette: {}
});

const colors = [
  '#FFFFFF',
  '#FCFFFC',
  '#EEFFEE',
  '#E0FFE0',
  '#D2FFD2',
  '#C4FFC4',
  '#B6FFB6',
  '#A8FFA8',
  '#9AFF9A',
  '#8CFF8C',
  '#7EFF7E',
  '#70FF70',
  '#62FF62',
  '#54FF54',
  '#46FF46',
  '#38FF38',
  '#2AFF2A',
  '#1CFF1C',
  '#0EFF0E',
  '#00FF00',
  '#00FF00',
  '#00FF00',
  '#00FF00',
  '#00FF00',
  '#00FF00',
  '#00FF00',
];

const HighlightedCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      fontSize: 12,
      backgroundColor:
        value < 0 ? '#ef5350' : value >= 0 ? colors[value] : 'white',
      ...style,
    }}
  >
    <span
      style={{
        color: value < 0 ? 'white' : 'black',
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

const Cell = props => {
  return <HighlightedCell {...props} />;
};

export default () => {
  const colArr = [
    { name: 'State', title: 'State' },
    { name: 'Texas', title: 'Texas' },
    { name: 'Louisiana', title: 'Louisiana' },
    { name: 'Indiana', title: 'Indiana' },
    { name: 'Nebraska', title: 'Nebraska' },
    { name: 'SouthCarolina', title: 'South Carolina' },
    { name: 'Oklahoma', title: 'Oklahoma' },
    { name: 'Arkansas', title: 'Arkansas' },
    { name: 'Kansas', title: 'Kansas' },
    { name: 'Georgia', title: 'Georgia' },
    { name: 'Utah', title: 'Utah' },
    { name: 'Alabama', title: 'Alabama' },
    { name: 'Michigan', title: 'Michigan' },
    { name: 'Idaho', title: 'Idaho' },
    { name: 'SouthDakota', title: 'South Dakota' },
    { name: 'RhodeIsland', title: 'Rhode Island' },
    { name: 'Colorado', title: 'Colorado' },
    { name: 'Wyoming', title: 'Wyoming' },
    { name: 'Ohio', title: 'Ohio' },
    { name: 'Montana', title: 'Montana' },
    { name: 'California', title: 'California' },
    { name: 'Washington', title: 'Washington' },
    { name: 'Florida', title: 'Florida' },
    { name: 'Oregon', title: 'Oregon' },
    { name: 'Minnesota', title: 'Minnesota' },
    { name: 'Alaska', title: 'Alaska' },
    { name: 'NorthDakota', title: 'North Dakota' },
    { name: 'NewJersey', title: 'New Jersey' },
    { name: 'Massachusetts', title: 'Massachusetts' },
    { name: 'Maryland', title: 'Maryland' },
    { name: 'Iowa', title: 'Iowa' },
    { name: 'Connecticut', title: 'Connecticut' },
    { name: 'Pennsylvania', title: 'Pennsylvania' },
    { name: 'Arizona', title: 'Arizona' },
    { name: 'Illinois', title: 'Illinois' },
    { name: 'Wisconsin', title: 'Wisconsin' },
    { name: 'Mississippi', title: 'Mississippi' },
    { name: 'NewYork', title: 'New York' },
    { name: 'WestVirginia', title: 'West Virginia' },
    { name: 'Vermont', title: 'Vermont' },
    { name: 'NorthCarolina', title: 'North Carolina' },
    { name: 'Nevada', title: 'North Carolina' },
    { name: 'DistrictofColumbia', title: 'District of Columbia' },
    { name: 'Missouri', title: 'Missouri' },
    { name: 'Hawaii', title: 'Hawaii' },
    { name: 'Kentucky', title: 'Kentucky' },
    { name: 'Virginia', title: 'Virginia' },
    { name: 'Tennessee', title: 'Tennessee' },
    { name: 'Maine', title: 'Maine' },
    { name: 'Delaware', title: 'Delaware' },
    { name: 'NewMexico', title: 'New Mexico' },
    { name: 'NewHampshire', title: 'New Hampshire' },
  ];

  const rows = data;

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Grid rows={rows} columns={colArr}>
          <SortingState
            defaultSorting={[{ columnName: 'Texas', direction: 'desc' }]}
          />
          <IntegratedSorting />
          <Table cellComponent={Cell} />
          <TableHeaderRow showSortingControls />
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};
