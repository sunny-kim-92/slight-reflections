/* eslint react/prop-types: 0 */
import React from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const theme = createTheme({
    palette: {}
});

const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
        {...restProps}
        style={{
            fontSize: 13,
            backgroundColor:
                value === 51 ||
                    value === 436 ||
                    value === 3 ||
                    value === 56 ||
                    value === 456 ||
                    value === 3 ||
                    value === 'Derrius Guice'
                    ? '#e8e8e8'
                    : value === 8.5 || value === 7.6 || value === 6.5
                        ? '#00ff00'
                        : 'white',
            ...style,
        }}
    >
        <span>{value}</span>
    </Table.Cell>
);

const Cell = props => <HighlightedCell {...props} />;

const GuiceFirstTable = () => {
    const columns = [
        { name: 'Player', title: 'Player' },
        { name: 'RushAttempts', title: 'Rush Attempts' },
        { name: 'RushYards', title: 'Rush Yards' },
        { name: 'YardsPerRush', title: 'Yards Per Rush' },
        { name: 'RushTDs', title: 'Rush TD' },
        { name: 'TotalTouches', title: 'Total Touches' },
        { name: 'TotalYards', title: 'Total Yards' },
        { name: 'TotalTDs', title: 'Total TD' },
    ];
    const rows = [
        {
            Player: 'Derrius Guice',
            RushAttempts: 51,
            RushYards: 436,
            YardsPerRush: 8.5,
            RushTDs: 3,
            TotalTouches: 56,
            TotalYards: 456,
            TotalTDs: 3,
        },
        {
            Player: 'Leonard Fournette',
            RushAttempts: 300,
            RushYards: 1953,
            YardsPerRush: 6.5,
            RushTDs: 22,
            TotalTouches: 319,
            TotalYards: 2206,
            TotalTDs: 23,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Grid rows={rows} columns={columns}>
                    <Table cellComponent={Cell} />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default GuiceFirstTable;