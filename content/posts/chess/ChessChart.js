import React, { Component, useRef, useState, useEffect } from 'react';
import { Doughnut, getDatasetAtEvent } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import Dropdown from 'react-select';
import {
  Container,
  DropdownContainer,
  ChartLayout,
  TableCell,
  TableHeader,
  GamesTable,
  DoughnutContainer,
  ChessboardContainer,
} from './ChessChart.css';
import Chessboard from 'chessboardjsx';
import * as ChessJS from "chess.js";
import { data } from './complete';

Chart.register(...registerables);
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

function ChessChart() {
  const [playerOne, setPlayerOne] = useState({ value: 'Magnus_Carlsen', label: 'Magnus Carlsen' })
  const [playerTwo, setPlayerTwo] = useState({ value: 'Anish_Giri', label: 'Anish Giri' })
  const [playerThree, setPlayerThree] = useState({ value: 'Fabiano_Caruana', label: 'Fabiano Caruana' })
  const [playerFour, setPlayerFour] = useState({ value: 'Ian_Nepomniachtchi', label: 'Ian Nepomniachtchi' })
  const playerOptions = [
    { value: 'Magnus_Carlsen', label: 'Magnus Carlsen' },
    { value: 'Anish_Giri', label: 'Anish Giri' },
    { value: 'Fabiano_Caruana', label: 'Fabiano Caruana' },
    { value: 'Ian_Nepomniachtchi', label: 'Ian Nepomniachtchi' },
    { value: 'Liren_Ding', label: 'Ding Liren' },
    { value: 'Alireza_Firouzja', label: 'Alireza Firouzja' },
    { value: 'Hikaru_Nakamura', label: 'Hikaru Nakamura' },
  ]
  const [mainPlayerColor, setMainPlayerColor] = useState({ value: 'Both', label: 'Both' })
  const chessObject = new Chess()
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [games, setGames] = useState([])
  const [moves, setMoves] = useState([])
  const [notation, setNotation] = useState('')
  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([])

  useEffect(() => {
    let totalMoveCountMap = {};
    let playersMoveCountMap = {};

    let newGames = [];
    let opponentName = '';

    data.forEach(entry => {
      if (getColorFilter(entry)) {
        let tempGame = entry;
        let moves = null;
        if (typeof entry.moves == 'object') {
          moves = entry.moves;
          tempGame['moves'] = moves;
        } else {
          let moveString = entry.moves;
          moves = moveString.split(' ');
          tempGame['moves'] = moves;
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].indexOf('.') != -1) {
              moves.splice(i, 1);
            }
          }
        }
        if (!totalMoveCountMap[moves[0]]) {
          totalMoveCountMap[moves[0]] = 1;
        } else {
          totalMoveCountMap[moves[0]]++;
        }

        if (playerOne == entry.white) {
          opponentName = entry.black;
        } else {
          opponentName = entry.white;
        }

        if (!playersMoveCountMap[opponentName]) {
          playersMoveCountMap[opponentName] = {};
        }
        if (!playersMoveCountMap[opponentName][moves[0]]) {
          playersMoveCountMap[opponentName][moves[0]] = 1;
        } else {
          playersMoveCountMap[opponentName][moves[0]]++;
        }
        newGames.push(tempGame);
      }
    });

    generateChart(totalMoveCountMap, playersMoveCountMap, newGames);
  }, [])

  const handleReset = () => {
    let totalMoveCountMap = {};
    let playersMoveCountMap = {};

    let newGames = [];
    let opponentName = '';

    data.forEach(entry => {
      if (getColorFilter(entry)) {
        let tempGame = entry;
        let moves = null;
        if (typeof entry.moves == 'object') {
          moves = entry.moves;
          tempGame['moves'] = moves;
        } else {
          let moveString = entry.moves;
          moves = moveString.split(' ');
          tempGame['moves'] = moves;
          for (let i = 0; i < moves.length; i++) {
            if (moves[i].indexOf('.') != -1) {
              moves.splice(i, 1);
            }
          }
        }

        if (!totalMoveCountMap[moves[0]]) {
          totalMoveCountMap[moves[0]] = 1;
        } else {
          totalMoveCountMap[moves[0]]++;
        }

        if (playerOne == entry.white) {
          opponentName = entry.black;
        } else {
          opponentName = entry.white;
        }

        if (!playersMoveCountMap[opponentName]) {
          playersMoveCountMap[opponentName] = {};
        }
        if (!playersMoveCountMap[opponentName][moves[0]]) {
          playersMoveCountMap[opponentName][moves[0]] = 1;
        } else {
          playersMoveCountMap[opponentName][moves[0]]++;
        }
        newGames.push(tempGame);
      }
    });
    setMoves([])
    generateChart(totalMoveCountMap, playersMoveCountMap, newGames);
  };

  const handleMoveSelect = event => {
    console.log(event)
    if (event[0]) {
      let moves = moves;
      let newMove = labels[event[0]._index];
      moves.push(labels[event[0]._index]);
      let moveNumber = moves.length;

      let totalMoveCountMap = {};
      let playersMoveCountMap = {};
      let isEqual = false;
      let opponentName = '';
      let newGames = games;
      newGames = newGames.filter(game => {
        isEqual = true;
        moves.some((move, key) => {
          if (game.moves[key] != move) {
            isEqual = false;
            return false;
          }
        });
        if (isEqual) {
          if (!totalMoveCountMap[game.moves[moveNumber]]) {
            totalMoveCountMap[game.moves[moveNumber]] = 1;
          } else {
            totalMoveCountMap[game.moves[moveNumber]]++;
          }

          if (playerOne == game.white) {
            opponentName = game.black;
          } else {
            opponentName = game.white;
          }

          if (!playersMoveCountMap[opponentName]) {
            playersMoveCountMap[opponentName] = {};
          }
          if (!playersMoveCountMap[opponentName][game.moves[moveNumber]]) {
            playersMoveCountMap[opponentName][game.moves[moveNumber]] = 1;
          } else {
            playersMoveCountMap[opponentName][game.moves[moveNumber]]++;
          }
          return true;
        }
        return false;
      });

      generateChart(
        totalMoveCountMap,
        playersMoveCountMap,
        newGames,
        newMove
      );
    }
  };

  const generateChart = (
    totalMoveCountMap,
    playersMoveCountMap,
    newGames,
    newMove = null
  ) => {
    let newLabels = [];
    let newDatasets = [];

    let tempArr = [];
    for (let i in totalMoveCountMap) {
      tempArr.push({ move: i, count: totalMoveCountMap[i] });
    }

    tempArr.sort((a, b) => {
      return b.count - a.count;
    });

    tempArr.forEach(move => {
      newLabels.push(move.move);
    });

    let tempOpponentMap = {};
    for (let i in playersMoveCountMap) {
      tempOpponentMap = {};
      tempOpponentMap['label'] = i;
      tempOpponentMap['data'] = [];
      newLabels.forEach(move => {
        tempOpponentMap['data'].push(playersMoveCountMap[i][move]);
      });

      if (i == playerTwo) {
        tempOpponentMap['backgroundColor'] = 'rgba(255, 0, 0, 0.1)';
      } else if (i == playerThree) {
        tempOpponentMap['backgroundColor'] = 'rgba(0, 255, 0, 0.1)';
      } else {
        tempOpponentMap['backgroundColor'] = 'rgba(0, 0, 255, 0.1)';
      }
      newDatasets.push(tempOpponentMap);
    }

    let chessObj = chessObject;
    let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    if (newMove) {
      chessObj.move(newMove);
      fen = chessObj.fen();
    }

    newGames.sort(sortGames);
    setFen(fen)
    setGames(newGames)
    setLabels(newLabels)
    setDatasets(newDatasets)
  };

  const handlePlayerOneChange = event => {
    setPlayerOne(event)
    setMoves([])
    setLabels([])
    setDatasets([
      {
        data: [],
      },
    ])
    handleReset()
  };

  const handlePlayerTwoChange = event => {
    setPlayerTwo(event)
    setMoves([])
    setLabels([])
    setDatasets([
      {
        data: [],
      },
    ])
    handleReset()
  };

  const handlePlayerThreeChange = event => {
    setPlayerThree(event)
    setMoves([])
    setLabels([])
    setDatasets([
      {
        data: [],
      },
    ])
    handleReset()
  };

  const handlePlayerFourChange = event => {
    setPlayerFour(event)
    setMoves([])
    setLabels([])
    setDatasets([
      {
        data: [],
      },
    ])
    handleReset()
  };

  const handleColorChange = event => {
    setMainPlayerColor(event)
    setMoves([])
    setLabels([])
    setDatasets([
      {
        data: [],
      },
    ])
    handleReset()
  };

  const sortGames = (game1, game2) => {
    if (
      game1.white == playerOne &&
      game2.white != playerOne
    ) {
      return -1;
    }
    if (
      game2.white == playerOne &&
      game1.white != playerOne
    ) {
      return 1;
    }
    let player1Compare = '';
    let player2Compare = '';

    if (game1.white == playerOne) {
      player1Compare = game1.black;
    } else {
      player1Compare = game1.white;
    }

    if (game2.white == playerOne) {
      player2Compare = game2.black;
    } else {
      player2Compare = game2.white;
    }
    if (player1Compare == player2Compare) {
      return game1.tournament > game2.tournament
        ? 1
        : game1.tournament < game2.tournament
          ? -1
          : 0;
    } else {
      if (player1Compare == playerTwo) {
        return -1;
      } else if (player2Compare == playerTwo) {
        return 1;
      } else if (player1Compare == playerThree) {
        return -1;
      } else {
        return 1;
      }
    }
  };

  const getColorFilter = entry => {
    if (mainPlayerColor == 'Both') {
      return (
        (entry.white == playerOne ||
          entry.black == playerOne) &&
        (entry.white == playerTwo ||
          entry.black == playerTwo ||
          entry.white == playerThree ||
          entry.black == playerThree ||
          entry.white == playerFour ||
          entry.black == playerFour)
      );
    }
    if (mainPlayerColor == 'White') {
      return (
        entry.white == playerOne &&
        (entry.black == playerTwo ||
          entry.black == playerThree ||
          entry.black == playerFour)
      );
    } else {
      return (
        entry.black == playerOne &&
        (entry.white == playerTwo ||
          entry.white == playerThree ||
          entry.white == playerFour)
      );
    }
  };

  const getGameNotation = (str) => {
    if (!str.length) {
      return '';
    }
    let final = '';
    str.forEach((move, i) => {
      if (i % 2 == 0) {
        let moveNumber = i / 2 + 1;
        final += moveNumber;
        final += '. ';
        final += move;
      } else {
        final += ', ';
        final += move;
        final += ' ';
      }
    });
    return final;
  };

  let radarData = {
    labels: labels,
    datasets: datasets,
  };

  let doughnutData = JSON.parse(JSON.stringify(radarData));
  doughnutData.datasets.forEach(circle => {
    circle.backgroundColor = [
      '#12b8da',
      '#49997c',
      '#027ab0',
      '#e51a1a',
      '#eed630',
      '#66545e',
      '#aa6f73',
      '#c7bbc9',
    ];
  });

  return (
    <Container>
      <DropdownContainer>
        <div style={{ textAlign: 'left', marginBottom: '1vh' }}>
          Main Player:
        </div>
        <Dropdown
          menuPlacement="auto"
          options={playerOptions.filter(player => {
            return (
              player != playerTwo &&
              player != playerThree &&
              player != playerFour
            );
          })}
          onChange={handlePlayerOneChange}
          value={playerOne}
          placeholder="Select a Player"
        />
      </DropdownContainer>
      <DropdownContainer style={{ marginBottom: '4vh' }}>
        <div style={{ textAlign: 'left', marginBottom: '1vh' }}>
          Main Player Color:
        </div>
        <Dropdown
          menuPlacement="auto"
          options={[
            { value: 'Both', label: 'Both' },
            { value: 'Black', label: 'Black' },
            { value: 'White', label: 'White' },
          ]}
          onChange={handleColorChange}
          value={mainPlayerColor}
          defaultValue={{ value: 'Both', label: 'Both' }}
        />
      </DropdownContainer>
      <DropdownContainer>
        <div style={{ textAlign: 'left', marginBottom: '1vh' }}>
          Players to Compare:
        </div>
        <Dropdown
          menuPlacement="auto"
          options={playerOptions.filter(player => {
            return (
              player != playerOne &&
              player != playerThree &&
              player != playerFour
            );
          })}
          onChange={handlePlayerTwoChange}
          value={playerTwo}
          placeholder="Select a Player"
        />
      </DropdownContainer>
      <DropdownContainer>
        <Dropdown
          menuPlacement="auto"
          options={playerOptions.filter(player => {
            return (
              player != playerOne &&
              player != playerTwo &&
              player != playerFour
            );
          })}
          onChange={handlePlayerThreeChange}
          value={playerThree}
          placeholder="Select a Player"
        />
      </DropdownContainer>
      <DropdownContainer>
        <Dropdown
          menuPlacement="auto"
          options={playerOptions.filter(player => {
            return (
              player != playerOne &&
              player != playerTwo &&
              player != playerThree
            );
          })}
          onChange={handlePlayerFourChange}
          value={playerFour}
          placeholder="Select a Player"
        />
      </DropdownContainer>
      <ChartLayout>
        <DoughnutContainer>
          <Doughnut
            data={doughnutData}
            onClick={evt => {
              handleMoveSelect(evt);
            }}
          ></Doughnut>
          {/* <div style={{ marginTop: '5vh' }}>
            &nbsp;{getGameNotation()}
          </div> */}
          <button style={{ marginTop: '2vh' }} onClick={handleReset}>
            Reset Moves
          </button>
        </DoughnutContainer>
        <ChessboardContainer>
          <Chessboard
            allowDrag={() => false}
            width={480}
            position={fen}
          ></Chessboard>
        </ChessboardContainer>
      </ChartLayout>
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
              <TableHeader>Tournament</TableHeader>
              <TableHeader>White</TableHeader>
              <TableHeader>Black</TableHeader>
              <TableHeader>Result</TableHeader>
              <TableHeader>ECO</TableHeader>
            </tr>
          </thead>
          <tbody>
            {games.map(game => {
              return (
                <tr
                  key={game.id}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <TableCell>{game.tournament}</TableCell>
                  <TableCell>{game.white.replace('_', ' ')}</TableCell>
                  <TableCell>{game.black.replace('_', ' ')}</TableCell>
                  <TableCell>{game.result}</TableCell>
                  <TableCell>{game.eco}</TableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </GamesTable>
    </Container>
  );
}

export default ChessChart;
