/* eslint react/prop-types: 0 */
import React, { useRef, useState } from 'react';
import { teamsData, gamesData } from './data.js'
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import Select, { StylesConfig } from 'react-select'
import {
    TableCell,
    TableHeader,
    GamesTable,
} from './Fact.css';

const SCORE_WEIGHT = 0.5
const SCALE = 0.112
const INITIAL_MOMENTUM = 0.1
const INITIAL_LOGIT = 0.9
const ACCELERATE = 1.2
const DECELERATE = 0.5
const MAX_ITERATIONS = 20;
const TOLERANCE = 1e-8;

const theme = createTheme({
    palette: {}
});


function signum(x) {
    if (x < 0)
        return -1.0;
    else if (x > 0)
        return 1.0;
    else
        return 0.0;
}

const Chart = () => {
    const [games, setGames] = useState(gamesData);
    const [teams, setTeams] = useState(teamsData);
    const [selectedTeamOne, setSelectedTeamOne] = useState(16)
    const [selectedTeamTwo, setSelectedTeamTwo] = useState(28)
    const [teamOneScore, setTeamOneScore] = useState(1)
    const [teamTwoScore, setTeamTwoScore] = useState(33)
    const [defaultColumnWidths] = useState([
        { columnName: 'name', width: '20%' },
        { columnName: 'logit', width: '20%' },
        { columnName: 'wins', width: '9%' },
        { columnName: 'losses', width: '9%' },
        { columnName: 'ties', width: '9%' },
        { columnName: 'pointsFor', width: '12%' },
        { columnName: 'pointsAgainst', width: '12%' },
    ]);

    const teamNames = {
        1: 'Arizona Cardinals',
        2: 'Atlanta Falcons',
        3: 'Baltimore Ravens',
        4: 'Buffalo Bills',
        5: 'Carolina Panthers',
        6: 'Chicago Bears',
        7: 'Cincinnati Bengals',
        8: 'Cleveland Browns',
        9: 'Dallas Cowboys',
        10: 'Denver Broncos',
        11: 'Detroit Lions',
        12: 'Green Bay Packers',
        13: 'Houston Texans',
        14: 'Indianapolis Colts',
        15: 'Jacksonville Jaguars',
        16: 'Kansas City Chiefs',
        17: 'Las Vegas Raiders',
        18: 'Los Angeles Chargers',
        19: 'Los Angeles Rams',
        20: 'Miami Dolphins',
        21: 'Minnesota Vikings',
        22: 'New England Patriots',
        23: 'New Orleans Saints',
        24: 'New York Giants',
        25: 'New York Jets',
        26: 'Philadelphia Eagles',
        27: 'Pittsburgh Steelers',
        28: 'San Francisco 49ers',
        29: 'Seattle Seahawks',
        30: 'Tampa Bay Buccaneers',
        31: 'Tennessee Titans',
        32: 'Washington Commanders'
    }

    function gradeScore(game, scale) {
        const margin = game[2] - game[3]

        let grade = SCORE_WEIGHT * logit(margin * scale)

        grade += (1.0 - SCORE_WEIGHT) * (1.0 + signum(margin)) * 0.5

        return grade
    }

    function expectedGradeScore(logit1, logit2, scale) {
        // console.log('logit1: ' + logit1 + ' logit2: ' + logit2)
        const diff = logit1 - logit2
        return logit(diff * scale)
    }

    function logit(x) {
        return 1.0 / (1.0 + Math.exp(-x))
    }

    // TEAM FUNCTIONS
    function updateLogit(team) {
        // if(team.id === 2){
        //     console.log(team)
        // }
        const diff = team.sumGrades - team.sumExpectedGrades
        // console.log(team.sumGrades)
        // console.log(team.sumExpectedGrades)
        if (signum(team.momentum) == signum(diff)) {
            team.momentum *= ACCELERATE
        }
        else {
            team.momentum *= -DECELERATE
        }
        team.logit += team.momentum
        return Math.abs(diff) < TOLERANCE
    }

    function addGrade(team, grade) {
        team.gamesPlayed++
        return team.sumGrades + grade
    }

    function addExpectedGrade(team, grade) {
        return team.sumExpectedGrades + grade
    }

    function getPct(team) {
        return team.gamesPlayed > 0
            ? team.sumGrades / team.gamesPlayed
            : 0
    }

    function clearExpectedGrades() {
        teams.forEach((team) => {
            team.sumExpectedGrades = 0.0
        })
    }

    function updateLogits(teamArr) {
        let converged = true
        teamArr.forEach((team) => {
            if (!updateLogit(team)) {
                converged = false
            }
        })
        return converged
    }

    // function addPct(game){
    //     const teamOne = teams.find((team) => {
    //         return team.id === game[0]
    //     })
    //     const teamTwo = teams.find((team) => {
    //         return team.id === game[1]
    //     })
    //     if (teamOne && teamTwo) {
    //         console.log('hey')
    //         const grade = gradeScore(game, SCALE)
    //         addGrade(teamOne, grade)
    //         addGrade(teamTwo, 1 - grade)
    //         if (!teamOne.wins && !teamOne.losses && !teamOne.ties) {
    //             teamOne.wins = 0
    //             teamOne.losses = 0
    //             teamOne.ties = 0
    //             teamOne.pointsFor = 0
    //             teamOne.pointsAgainst = 0
    //         }
    //         if (!teamTwo.wins && !teamTwo.losses && !teamTwo.ties) {
    //             teamTwo.wins = 0
    //             teamTwo.losses = 0
    //             teamTwo.ties = 0
    //             teamTwo.pointsFor = 0
    //             teamTwo.pointsAgainst = 0
    //         }
    //         if (game[2] > game[3]) {
    //             teamOne.wins++
    //             teamTwo.losses++
    //         } else if (game[3] < game[2]) {
    //             teamOne.losses++
    //             teamTwo.wins++
    //         } else {
    //             teamOne.ties++
    //             teamTwo.ties++
    //         }
    //         teamOne.pointsFor += game.scoreOne
    //         teamOne.pointsAgainst += game.scoreTwo
    //         teamTwo.pointsFor += game.scoreTwo
    //         teamTwo.pointsAgainst += game.scoreOne
    //         let newTeams = [...teams]
    //         setTeams(newTeams)
    //     }
    // }

    // GAME FUNCTIONS
    function calculatePct(gameArr, teamArr) {
        gameArr.forEach((game) => {
            const teamOne = teamArr.find((team) => {
                return team.id === game[0]
            })
            const teamTwo = teamArr.find((team) => {
                return team.id === game[1]
            })
            if (teamOne && teamTwo) {
                const grade = gradeScore(game, SCALE)
                teamOne.sumGrades = addGrade(teamOne, grade)
                teamTwo.sumGrades = addGrade(teamTwo, 1 - grade)
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
                if (game[2] > game[3]) {
                    teamOne.wins++
                    teamTwo.losses++
                } else if (game[3] > game[2]) {
                    teamOne.losses++
                    teamTwo.wins++
                } else {
                    teamOne.ties++
                    teamTwo.ties++
                }
                teamOne.pointsFor += game[2]
                teamOne.pointsAgainst += game[3]
                teamTwo.pointsFor += game[3]
                teamTwo.pointsAgainst += game[2]
                if(teamOne.id === 2){
                    console.log(teamOne)
                }
            }
        })
        return teamArr
    }

    function calculateLogit(scale, gameArr, teamArr) {
        let converged = false;
            teamArr.forEach((team) => {
                team.sumExpectedGrades = 0.0
            })
            gameArr.forEach((game) => {
                const teamOne = teamArr.find((team) => {
                    return team.id == game[0]
                })
                const teamTwo = teamArr.find((team) => {
                    return team.id == game[1]
                })
                if (teamOne && teamTwo) {
                    const expectedGrade = expectedGradeScore(teamOne.logit, teamTwo.logit, scale)
                    console.log('expected grade: ' + expectedGrade)
                    teamOne.sumExpectedGrades += expectedGrade
                    teamTwo.sumExpectedGrades = teamTwo.sumExpectedGrades + 1.0 - expectedGrade
                    converged = updateLogits(teamArr)
                }
            })
        return teamArr
    }

    function addGame() {
        let newGames = [...games, [parseInt(selectedTeamOne.value), parseInt(selectedTeamTwo.value), parseInt(teamOneScore), parseInt(teamTwoScore), null]]
        setGames(newGames)
        let newTeams = teams
        newTeams.forEach((team) => {
            team.logit = INITIAL_LOGIT
            team.momentum = INITIAL_MOMENTUM
            team.gamesPlayed = 0
            team.sumGrades = 0.0
            team.sumExpectedGrades = 0.0
            team.wins = 0
            team.losses = 0
            team.pointsFor = 0
            team.pointsAgainst = 0
        })
        setSelectedTeamOne('')
        setSelectedTeamTwo('')
        setTeamOneScore(null)
        setTeamTwoScore(null)
        // console.log(newTeams)
        newTeams = calculatePct(newGames, newTeams)
        // addPct([parseInt(selectedTeamOne.value), parseInt(selectedTeamTwo.value), parseInt(teamOneScore), parseInt(teamTwoScore), null])
        newTeams = calculateLogit(SCALE, newGames, newTeams)
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

    // console.log(teams)
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper>
                    <Grid rows={teams} columns={teamCols}>
                        <SortingState
                            defaultSorting={[{ columnName: 'logit', direction: 'desc' }]}
                        />
                        <IntegratedSorting />
                        <Table cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                        <TableHeaderRow showSortingControls />
                    </Grid>
                </Paper>
            </ThemeProvider>
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
            <Select
                value={selectedTeamOne}
                onChange={e => setSelectedTeamOne(e)}
                options={Object.keys(teamNames).map((teamId, index) => {
                    return { value: teamId, label: teamNames[teamId] }
                })}
                styles={customStyles}

            />
            <input value={teamOneScore || ''} onChange={(e) => setTeamOneScore(e.target.value)} type="number"></input>
            <Select
                value={selectedTeamTwo}
                onChange={e => setSelectedTeamTwo(e)}
                options={Object.keys(teamNames).map((teamId, index) => {
                    return { value: teamId, label: teamNames[teamId] }
                })}
                styles={customStyles}
            />
            <input value={teamTwoScore || ''} onChange={(e) => setTeamTwoScore(e.target.value)} type="number"></input>
            <button onClick={addGame}>Submit</button>
        </div>
    );
};

export default Chart;