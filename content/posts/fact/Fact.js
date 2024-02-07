/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"

import { TableCell, TableHeader, GamesTable } from './Fact.css';
import { teamsData, teamNames, gamesData } from './data.js'

const SCORE_WEIGHT = 0.5
const SCALE = 0.112
const INITIAL_MOMENTUM = 0.1
const INITIAL_LOGIT = 0.9
const ACCELERATE = 1.2
const DECELERATE = 0.5
const MAX_ITERATIONS = 100;
const TOLERANCE = 1e-8;

function signum(x) {
    if (x < 0)
        return -1.0;
    else if (x > 0)
        return 1.0;
    else
        return 0.0;
}

function logit(x) {
    return 1.0 / (1.0 + Math.exp(-x))
}

const Chart = () => {
    const [games, setGames] = useState(gamesData);
    const [teams, setTeams] = useState(teamsData);
    const [selectedTeamOne, setSelectedTeamOne] = useState(16)
    const [selectedTeamTwo, setSelectedTeamTwo] = useState(28)
    const [teamOneScore, setTeamOneScore] = useState()
    const [teamTwoScore, setTeamTwoScore] = useState()
    const methods = useForm();
    const [sorting, setSorting] = useState([{ columnName: 'logit', direction: 'desc' }]);
    const [defaultColumnWidths] = useState([
        { columnName: 'name', width: '20%' },
        { columnName: 'logit', width: '20%' },
        { columnName: 'wins', width: '9%' },
        { columnName: 'losses', width: '9%' },
        { columnName: 'ties', width: '9%' },
        { columnName: 'pointsFor', width: '12%' },
        { columnName: 'pointsAgainst', width: '12%' },
    ]);
    const { getValues, handleSubmit, register, reset } = methods

    function addGame(data) {
        const newTeams = teamsData

        //Reset team stats
        newTeams.forEach((team) => {
            team.pointsFor = 0
            team.pointsAgainst = 0
            team.momentum = INITIAL_MOMENTUM
            team.logit = INITIAL_LOGIT
            team.wins = 0
            team.losses = 0
            team.ties = 0
            team.sumGrades = 0.0
            team.sumExpectedGrades = 0.0
            team.gamesPlayed = 0
        })

        let newGames = [...games, [parseInt(data.teamOne.value), parseInt(data.teamTwo.value), parseInt(data.scoreOne), parseInt(data.scoreTwo), null]]
        setGames(newGames)

        newGames.forEach((game) => {
            const teamOne = teams.find((team) => {
                return team.id == game[0]
            })
            const teamTwo = teams.find((team) => {
                return team.id == game[1]
            })
            let margin = game[2] - game[3]

            let grade = SCORE_WEIGHT * logit(margin * SCALE)

            grade += (1.0 - SCORE_WEIGHT) * (1.0 + signum(margin)) * 0.5

            teamOne.sumGrades += grade
            teamTwo.sumGrades = teamTwo.sumGrades + 1 - grade
            teamOne.gamesPlayed++
            teamTwo.gamesPlayed++
            if (!teamOne.wins && !teamOne.losses && !teamOne.ties) {
                teamOne.wins = 0
                teamOne.losses = 0
                teamOne.ties = 0
                teamOne.pointsFor = 0
                teamOne.pointsAgainst = 0
            }
            if (!teamTwo.wins && !teamTwo.losses && !teamTwo.ties) {
                teamTwo.wins = 0
                teamTwo.losses = 0
                teamTwo.ties = 0
                teamTwo.pointsFor = 0
                teamTwo.pointsAgainst = 0
            }

            //Add wins-losses-ties
            if (game[2] > game[3]) {
                teamOne.wins++
                teamTwo.losses++
            } else if (game[2] < game[3]) {
                teamOne.losses++
                teamTwo.wins++
            } else {
                teamOne.ties++
                teamTwo.ties++
            }

            //Points for-against
            teamOne.pointsFor += game[2]
            teamOne.pointsAgainst += game[3]
            teamTwo.pointsFor += game[3]
            teamTwo.pointsAgainst += game[2]
        })

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            newTeams.forEach((team) => {
                team.sumExpectedGrades = 0.0
            })
            //Update ranking stats
            newGames.forEach((game) => {
                const teamOne = teams.find((team) => {
                    return team.id == game[0]
                })
                const teamTwo = teams.find((team) => {
                    return team.id == game[1]
                })
                const diff = teamOne.logit - teamTwo.logit
                const expectedGrade = logit(diff * SCALE)
                teamOne.sumExpectedGrades += expectedGrade
                teamTwo.sumExpectedGrades = teamTwo.sumExpectedGrades + 1.0 - expectedGrade
            })
            newTeams.forEach((team) => {
                const diff = team.sumGrades - team.sumExpectedGrades
                if (signum(team.momentum) == signum(diff)) {
                    team.momentum *= ACCELERATE
                }
                else {
                    team.momentum *= -DECELERATE
                }
                team.logit += team.momentum
            })
        }

        setTeams(newTeams)
        setSorting([{ columnName: 'logit', direction: 'desc' }])
        reset({
            teamOne: '',
            scoreOne: '',
            teamTwo: '',
            scoreTwo: ''
        })
    }

    const HighlightedCell = ({ value, style, ...restProps }) => (
        <Table.Cell
            {...restProps}
            style={{
                fontSize: 12,
            }}
        >
            <span>
                {value}
            </span>
        </Table.Cell>
    );

    const Cell = props => {
        return <HighlightedCell {...props} />;
    };

    const teamCols = [
        { name: 'displayName', title: 'Team' },
        { name: 'logit', title: 'Logit' },
        { name: 'wins', title: 'Wins' },
        { name: 'losses', title: 'Losses' },
        { name: 'ties', title: 'Ties' },
        { name: 'pointsFor', title: 'Points For' },
        { name: 'pointsAgainst', title: 'Points Against' },
    ]

    //Select styling
    const customStyles = {
        option: provided => ({
            ...provided,
            color: 'black'
        }),
        control: provided => ({
            ...provided,
            color: 'black'
        }),
        singleValue: provided => ({
            ...provided,
            color: 'black'
        })
    }

    //Theme styling
    const theme = createTheme({ palette: {} });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper>
                    <Grid rows={teams} columns={teamCols}>
                        <SortingState
                            sorting={sorting}
                            onSortingChange={setSorting}
                        />
                        <IntegratedSorting />
                        <Table cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                        <TableHeaderRow showSortingControls />
                    </Grid>
                </Paper>
            </ThemeProvider>
            <form onSubmit={handleSubmit(addGame)}>
                <Controller
                    control={methods.control}
                    name="teamOne"
                    rules={{ required: true }}
                    render={renderProps => {
                        const { ref, ...rest } = renderProps.field;
                        return (
                            <label>Home
                                <Select
                                    {...register("teamOne", {
                                        required: true, validate: {
                                            notSameTeam: (team) => {
                                                return (getValues("teamTwo")
                                                    && team == getValues("teamTwo").value)
                                            }
                                        }
                                    })}
                                    options={Object.keys(teamNames).map((teamId, index) => {
                                        return { value: teamId, label: teamNames[teamId] }
                                    })}
                                    {...renderProps.field}
                                    onChange={e => {
                                        renderProps.field.onChange(e);
                                    }}
                                    styles={customStyles}
                                />
                            </label>
                        )
                    }}
                />
                <label>Score
                    <br />
                    <input
                        {...register("scoreOne", { required: true, pattern: /^[0-9]+/i })}
                        type="number"></input>
                </label>
                <br />
                <br />
                <Controller
                    control={methods.control}
                    name="teamTwo"
                    rules={{ required: true }}
                    render={renderProps => {
                        const { ref, ...rest } = renderProps.field;
                        return (
                            <label>Away
                                <Select
                                    {...register("teamTwo", {
                                        required: true, validate: {
                                            notSameTeam: (team) => {
                                                return (getValues("teamOne")
                                                    && team == getValues("teamOne").value)
                                            }
                                        }
                                    })}
                                    options={Object.keys(teamNames).map((teamId, index) => {
                                        return { value: teamId, label: teamNames[teamId] }
                                    })}
                                    {...renderProps.field}
                                    onChange={e => {
                                        renderProps.field.onChange(e);
                                    }}
                                    styles={customStyles}
                                />
                            </label>
                        )
                    }}
                />
                <label>Score
                    <br />
                    <input
                        {...register("scoreTwo", { required: true, pattern: /^[0-9]+/i })}
                        type="number"></input>
                </label>
                <button type="submit">Submit</button>
                <button onClick={() => {
                    reset(() => ({
                        teamOne: '',
                        scoreOne: '',
                        teamTwo: '',
                        scoreTwo: ''
                    }))
                }}>Reset</button>
            </form>
            <GamesTable>
                <table
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        borderCollapse: 'collapse',
                    }}
                >
                    <thead>
                        <tr style={{ width: '100%', justifyContent: 'center' }}>
                            <TableHeader>Date</TableHeader>
                            <TableHeader>Home</TableHeader>
                            <TableHeader>Home Score</TableHeader>
                            <TableHeader>Away</TableHeader>
                            <TableHeader>Away Score</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => {
                            return (
                                <tr
                                    key={index}
                                    style={{ width: '100%', justifyContent: 'center', borderBottom: '1pt solid' }}
                                >
                                    <TableCell>{game[4]}</TableCell>
                                    <TableCell>{teamNames[game[0]]}</TableCell>
                                    <TableCell>{game[2]}</TableCell>
                                    <TableCell>{teamNames[game[1]]}</TableCell>
                                    <TableCell>{game[3]}</TableCell>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </GamesTable>
        </div>
    );
};

export default Chart;