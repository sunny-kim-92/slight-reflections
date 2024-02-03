/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { teamIds, teamsData, gamesData } from './data.js'
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
const MAX_ITERATIONS = 15000;
const TOLERANCE = 1e-8;

function signum(x) {
    if (x < 0)
        return -1.0;
    else if (x > 0)
        return 1.0;
    else
        return 0.0;
}

class Team {
    constructor(name, id, logit, momentum) {
        this.name = name
        this.id = id
        this.logit = logit
        this.momentum = momentum
        this.gamesPlayed = 0
        this.sumGrades = 0.0
        this.sumExpectedGrades = 0.0
    }

    updateLogit() {
        const diff = this.sumGrades - this.sumExpectedGrades
        if (signum(this.momentum) == signum(diff)) {
            this.momentum *= ACCELERATE
        }
        else {
            this.momentum *= -DECELERATE
        }
        this.logit += this.momentum
        return Math.abs(diff) < TOLERANCE
    }

    addGrade(grade) {
        this.gamesPlayed++
        this.sumGrades += grade
    }

    addExpectedGrade(grade) {
        this.sumExpectedGrades += grade
    }

    getPct() {
        return this.gamesPlayed > 0
            ? this.sumGrades / this.gamesPlayed
            : 0
    }
}

class Game {
    teamOne;
    teamTwo;
    scoreOne;
    scoreTwo;
    date;

    constructor(teamOne, teamTwo, scoreOne, scoreTwo, date) {
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.scoreOne = scoreOne
        this.scoreTwo = scoreTwo
        this.date = date
    }
}

const Chart = () => {
    const [games, setGames] = useState([]);

    const handleChange = event => setGames(event.target.value);

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
        const margin = game.scoreOne - game.scoreTwo

        let grade = SCORE_WEIGHT * logit(margin * scale)

        grade += (1.0 - SCORE_WEIGHT) * (1.0 + signum(margin)) * 0.5

        return grade
    }

    function expectedGradeScore(logit1, logit2, scale) {
        const diff = logit1 - logit2
        return logit(diff * scale)
    }

    function logit(x) {
        return 1.0 / (1.0 + Math.exp(-x))
    }

    // TEAM FUNCTIONS
    function clearExpectedGrades() {
        teams.forEach((team) => {
            team.sumExpectedGrades = 0.0
        })
    }

    function updateLogits() {
        let converged = true
        teams.forEach((team) => {
            if (!team.updateLogit()) {
                converged = false
            }
        })
        return converged
    }

    const teams = []

    // Data
    for (let team in teamIds) {
        teams.push(new Team(team, teamIds[team], INITIAL_LOGIT, INITIAL_MOMENTUM))
    }

    let gameList = []
    gamesData.forEach((game) => {
        gameList.push(new Game(...game))
    })
    console.log(gameList)
    setGames(gameList)

    // GAME FUNCTIONS
    function calculatePct(scale) {
        games.forEach((game) => {
            const teamOne = teams.find((team) => {
                return team.id == game.teamOne
            })
            const teamTwo = teams.find((team) => {
                return team.id == game.teamTwo
            })
            const grade = gradeScore(game, SCALE)
            teamOne.addGrade(grade)
            teamTwo.addGrade(1 - grade)
        })
    }

    function calculateLogit(scale) {
        let converged = false;
        for (let i = 0; i < MAX_ITERATIONS && !converged; i++) {
            clearExpectedGrades()
            games.forEach((game) => {
                const teamOne = teams.find((team) => {
                    return team.id == game.teamOne
                })
                const teamTwo = teams.find((team) => {
                    return team.id == game.teamTwo
                })
                const expectedGrade = expectedGradeScore(teamOne.logit, teamTwo.logit, scale)
                teamOne.addExpectedGrade(expectedGrade)
                teamTwo.addExpectedGrade(1.0 - expectedGrade)
            })
            converged = updateLogits()
        }
        return converged
    }

    console.log(games)
    console.log(teams)

    calculatePct(SCALE);
    calculateLogit(SCALE);

    return (
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
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <TableCell>{game.date}</TableCell>
                                <TableCell>{teamNames[game.teamOne]}</TableCell>
                                <TableCell>{game.scoreOne}</TableCell>
                                <TableCell>{teamNames[game.teamTwo]}</TableCell>
                                <TableCell>{game.teamTwo}</TableCell>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </GamesTable>
    );
};

export default Chart;