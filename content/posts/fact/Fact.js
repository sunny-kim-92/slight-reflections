/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"
import { TableCell, TableHeader, GamesTable, TeamsTable } from './Fact.css';
import { teamsData, teamNames, gamesData } from './data.js'
import { ThemeProvider, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SCORE_WEIGHT = 0.5
const SCALE = 0.112
const INITIAL_MOMENTUM = 0.1
const INITIAL_LOGIT = 0.9
const ACCELERATE = 1.2
const DECELERATE = 0.5
const MAX_ITERATIONS = 100;

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
    const [games, setGames] = useState([...gamesData]);
    const [teams, setTeams] = useState([...teamsData].sort((a, b) => {
        if (a.logit < b.logit) {
            return 1;
        }
        if (a.logit > b.logit) {
            return -1;
        }
        return 0;
    }));
    const methods = useForm();
    const { getValues, handleSubmit, register, reset } = methods

    function addGame(data) {
        let newTeams = [...teams]

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
        updateTeams(newGames)
    }

    function updateTeams(gameList) {
        let newTeams = [...teamsData]
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
        gameList.forEach((game) => {
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
            gameList.forEach((game) => {
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
                team.logit += parseFloat(team.momentum)
                team.logit = Math.round(team.logit * 1000) / 1000
            })
        }
        newTeams.sort((a, b) => {
            if (a.logit < b.logit) {
                return 1;
            }
            if (a.logit > b.logit) {
                return -1;
            }
            return 0;
        })
        setTeams([...newTeams])
        reset({
            teamOne: '',
            scoreOne: '',
            teamTwo: '',
            scoreTwo: ''
        })
    }

    function handleReset() {
        setGames([...gamesData])
        updateTeams([...gamesData])
    }

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

    const theme = createTheme({
        palette: {}
    });

    return (
        <ThemeProvider theme={theme}>
            <p style={{ fontSize: '1.8rem', margin: '40px 0px 0px 0px', textAlign: 'center' }}>FACT Ratings for the 2023-2024 NFL Season</p>
            <TeamsTable>
                <table
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        borderCollapse: 'collapse',
                    }}
                >
                    <thead>
                        <tr style={{ width: '100%', justifyContent: 'center' }}>
                            <TableHeader>Rank</TableHeader>
                            <TableHeader>Team</TableHeader>
                            <TableHeader>Logit</TableHeader>
                            <TableHeader>Wins</TableHeader>
                            <TableHeader>Losses</TableHeader>
                            <TableHeader>Ties</TableHeader>
                            <TableHeader>Points For</TableHeader>
                            <TableHeader>Points Against</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {teams
                            .map((team, index) => {
                                return (
                                    <tr
                                        key={index}
                                        style={{ width: '100%', justifyContent: 'center', borderBottom: '1pt solid' }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{team.name.split("_")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ")}</TableCell>
                                        <TableCell>{team.logit.toFixed(3)}</TableCell>
                                        <TableCell>{team.wins}</TableCell>
                                        <TableCell>{team.losses}</TableCell>
                                        <TableCell>{team.ties}</TableCell>
                                        <TableCell>{team.pointsFor}</TableCell>
                                        <TableCell>{team.pointsAgainst}</TableCell>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </TeamsTable>
            <p style={{ fontSize: '1.8rem', margin: '0px', textAlign: 'center' }}>Add Games</p>
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
                                                    && team.value != getValues("teamTwo").value)
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
                    <TextField
                        type="number"
                        inputProps={{
                            inputProps: { min: 0 },
                            style: {
                                padding: '10px'
                            }
                        }}
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '5px'
                        }}
                        {...register("scoreOne", { required: true, pattern: /^[0-9]+/i, min: 0 })}></TextField>
                </label>
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
                                                console.log(getValues("teamOne"))
                                                console.log(team)
                                                return getValues("teamOne")
                                                    && team.value != getValues("teamOne").value
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
                </label>
                <br />
                <TextField
                    min="0"
                    type="number"
                    inputProps={{
                        inputProps: { min: 0 },
                        style: {
                            padding: '10px'
                        }
                    }}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '5px'
                    }}
                    {...register("scoreTwo", { required: true, pattern: /^[0-9]+/i })}></TextField>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '20vw' }}>
                    <Button variant="contained" type="submit">Submit</Button>
                    <Button variant="contained" onClick={handleReset}>Reset</Button>
                </div>
            </form>
            <p style={{ fontSize: '1.8rem', margin: '0px', textAlign: 'center' }}>Games List</p>
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
                            <TableHeader>Away</TableHeader>
                            <TableHeader>Away Score</TableHeader>
                            <TableHeader>Home</TableHeader>
                            <TableHeader>Home Score</TableHeader>
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
                                    <TableCell>{teamNames[game[1]]}</TableCell>
                                    <TableCell>{game[3]}</TableCell>
                                    <TableCell>{teamNames[game[0]]}</TableCell>
                                    <TableCell>{game[2]}</TableCell>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </GamesTable>
        </ThemeProvider>
    );
};

export default Chart;