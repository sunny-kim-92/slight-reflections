/* eslint react/prop-types: 0 */
import React from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { data } from './tableData';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';

const theme = createTheme({
  palette: {}
});

const posColors = [
  '#E0FFE0',
  '#C4FFC4',
  '#A8FFA8',
  '#8CFF8C',
  '#70FF70',
  '#54FF54',
  '#38FF38',
  '#1CFF1C',
  '#00FF00',
  '#00FF00',
];

const negColors = [
  '#FFE0E0',
  '#FFC4C4',
  '#FFA8A8',
  '#FF8C8C',
  '#FF7070',
  '#FF5454',
  '#FF3838',
  '#FF1C1C',
  '#FF0000',
  '#FF0000',
];

const HighlightedCell = ({ value, style, ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      fontSize: 12,
      backgroundColor:
        value === -1
          ? '#FF0000'
          : value === 1
          ? '#00FF00'
          : value === 0
          ? 'white'
          : value < 0
          ? negColors[Math.floor((value * -100) / 10)]
          : posColors[Math.floor((value * 100) / 10)],
      ...style,
    }}
  >
    <span
      style={{
        color: value < -0.29 ? 'white' : 'black',
      }}
    >
      {value}
    </span>
  </Table.Cell>
);

const Cell = props => <HighlightedCell {...props} />;

export default () => {
  const columns = [
    { name: 'State', title: 'State' },
    { name: 'Sotomayor', title: 'Sotomayor' },
    { name: 'Ginsburg', title: 'Ginsburg' },
    { name: 'Breyer', title: 'Breyer' },
    { name: 'Kagan', title: 'Kagan' },
    { name: 'Roberts', title: 'Roberts' },
    { name: 'Kavanaugh', title: 'Kavanaugh' },
    { name: 'Gorsuch', title: 'Gorsuch' },
    { name: 'Alito', title: 'Alito' },
    { name: 'Thomas', title: 'Thomas' },
  ];
  const rows = data;

  return (
    <ThemeProvider theme={theme}>
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SortingState
          defaultSorting={[{ columnName: 'Sotomayor', direction: 'desc' }]}
        />
        <IntegratedSorting />
        <Table cellComponent={Cell} />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Paper>
    </ThemeProvider>
  );
};
