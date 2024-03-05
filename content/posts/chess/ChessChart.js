import React, { useRef, useState, useEffect } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
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
} from './ChessChart.css';
import { Chessboard } from "react-chessboard";
import * as ChessJS from "chess.js";
import { data } from './complete';

Chart.register(...registerables);
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const chessObject = new Chess()

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
  const [mainPlayerColor, setMainPlayerColor] = useState({ value: 'Black', label: 'Black' })
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [games, setGames] = useState([])
  const [moves, setMoves] = useState([])
  const [notation, setNotation] = useState('')
  const [radarData, setRadarData] = useState({ labels: [], datasets: [] })
  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([])
  const chartRef = useRef();

  useEffect(() => {
    const load = async () => {
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

          opponentName = entry.white;

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
    }
    load()
  }, [])

  const handleReset = (options = {}) => {
    let totalMoveCountMap = {};
    let playersMoveCountMap = {};

    let newGames = [];
    let opponentName = '';

    let playerIndex = null
    let player = null
    let newColor = mainPlayerColor
    if(options.type === 'playerChange'){
      playerIndex = options.data.playerIndex
      player = options.data.player
    } else if(options.type === 'colorChange'){
      newColor = options.data.color
    }

    data.forEach(entry => {
      if (getColorFilter(entry, playerIndex, player, newColor)) {
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

        if (newColor.value == 'White') {
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

    // Set player state
    if (playerIndex === 1) {
      setPlayerOne(player)
    } else if (playerIndex === 2) {
      setPlayerTwo(player)
    } else if (playerIndex === 3) {
      setPlayerThree(player)
    } else if (playerIndex === 4) {
      setPlayerFour(player)
    }

    // Set color state
    console.log(newColor)
    if(newColor){
      setMainPlayerColor(newColor)
    }

    // Set games data state
    setMoves([])
    setNotation('')
    chessObject.reset()
    generateChart(totalMoveCountMap, playersMoveCountMap, newGames);
  };

  const handleMoveSelect = (event) => {

    let element = getElementAtEvent(chartRef.current, event)

    if (element[0]) {
      let newMove = labels[element[0].index];
      moves.push(labels[element[0].index]);
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

    let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    if (newMove) {
      chessObject.move(newMove);
      fen = chessObject.fen();
    }

    newGames.sort(sortGames);
    setFen(fen)
    setGames(newGames)
    setLabels(newLabels)
    setDatasets(newDatasets)
  };

  const handlePlayerOneChange = event => {
    handleReset({type: 'playerChange', data: {playerIndex: 1, player: event}})
  };

  const handlePlayerTwoChange = event => {
    handleReset({type: 'playerChange', data: {playerIndex: 2, player: event}})
  };

  const handlePlayerThreeChange = event => {
    handleReset({type: 'playerChange', data: {playerIndex: 3, player: event}})
  };

  const handlePlayerFourChange = event => {
    handleReset({type: 'playerChange', data: {playerIndex: 4, player: event}})
  };

  const handleColorChange = event => {
    handleReset({type: 'colorChange', data: {color: event}})
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

  const getColorFilter = (entry, playerIndex = null, player = null, color = null) => {
    let playerOneValue = playerOne.value
    let playerTwoValue = playerTwo.value
    let playerThreeValue = playerThree.value
    let playerFourValue = playerFour.value
    if(playerIndex === 1){
      playerOneValue = player.value
    } else if (playerIndex === 2){
      playerTwoValue = player.value
    } else if(playerIndex === 3){
      playerThreeValue = player.value
    } else if (playerIndex === 4){
      playerFourValue = player.value
    }

    let mainColor = mainPlayerColor.value
    if(color){
      mainColor = color.value
    }

    if (mainColor == 'White') {
      return (
        entry.white == playerOneValue &&
        (entry.black == playerTwoValue ||
          entry.black == playerThreeValue ||
          entry.black == playerFourValue)
      );
    } else {
      return (
        entry.black == playerOneValue &&
        (entry.white == playerTwoValue ||
          entry.white == playerThreeValue ||
          entry.white == playerFourValue)
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!moves.length) {
        return '';
      }
      let final = '';
      moves.forEach((move, i) => {
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
      setNotation(final);
    }
    load()
  }, [fen, moves])


  useEffect(() => {
    const load = async () => {
      let radarLabels = labels
      let radarDatasets = datasets
      radarDatasets.forEach(circle => {
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
      setRadarData({
        labels: radarLabels,
        datasets: radarDatasets
      })
    }
    load()
  }, [labels, datasets])

  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <div>
          <DropdownContainer>
            <div style={{ textAlign: 'left', marginBottom: '1vh' }}>
              Main Player:
            </div>
            <Dropdown
              menuPlacement="auto"
              options={playerOptions.filter(player => {
                return (
                  player.value != playerTwo.value &&
                  player.value != playerThree.value &&
                  player.value != playerFour.value
                );
              })}
              onChange={handlePlayerOneChange}
              value={playerOne}
              placeholder="Select a Player"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  color: '#FFF',
                })
              }}
            />
          </DropdownContainer>
          <DropdownContainer style={{ marginBottom: '4vh' }}>
            <div style={{ textAlign: 'left', marginBottom: '1vh' }}>
              Main Player Color:
            </div>
            <Dropdown
              menuPlacement="auto"
              options={[
                { value: 'Black', label: 'Black' },
                { value: 'White', label: 'White' },
              ]}
              onChange={handleColorChange}
              value={mainPlayerColor}
              defaultValue={{ value: 'Black', label: 'Black' }}
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
                  player.value != playerOne.value &&
                  player.value != playerThree.value &&
                  player.value != playerFour.value
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
                  player.value != playerOne.value &&
                  player.value != playerTwo.value &&
                  player.value != playerFour.value
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
                  player.value != playerOne.value &&
                  player.value != playerTwo.value &&
                  player.value != playerThree.value
                );
              })}
              onChange={handlePlayerFourChange}
              value={playerFour}
              placeholder="Select a Player"
            />
          </DropdownContainer>
        </div>
        <div>
          <ChartLayout>
            <DoughnutContainer>
              <Doughnut
                ref={chartRef}
                data={radarData}
                options={{
                  plugins: {
                    backgroundPlugin: false
                  }
                }}
                onClick={(evt) => {
                  handleMoveSelect(evt);
                }}
              ></Doughnut>
              <div style={{ marginTop: '3vh' }}>
                &nbsp;{notation}
              </div>
              <button onClick={handleReset}>
                Reset Moves
              </button>
            </DoughnutContainer>
            <Chessboard
              arePiecesDraggable={false}
              boardWidth={360}
              position={fen}
            ></Chessboard>
          </ChartLayout>
        </div>
      </div>
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
