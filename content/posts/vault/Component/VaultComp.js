import React from 'react';
import { Animate } from 'react-animate-mount';
import {
  ButtonGrid,
  Container,
  FinalContainer,
  FlexBottom,
  Intro,
  Item,
  NextBottom,
  Question,
  RadioButton,
  RadioButtonLabel,
  Wrapper,
} from './VaultComp.css.js';
import { parseTwo, parseThree, parseFour, finalVault } from './helper.js';
import { ThemeProvider, createTheme } from '@mui/material';
import Button from '@mui/material/Button';

import './styles.css';

const theme = createTheme({
  palette: {}
});


class VaultComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextItem: {},
      items: [
        {
          q: 'What direction will you face jumping off the springboard?',
          names: ['Forwards', 'Backwards'],
          values: ['f', 'b'],
        },
      ],
      dir: 'f',
      fTurn: 'z',
      salto: 'z',
      sTurn: 'zero',
      bp: 's',
      backFlag: false,
      activePage: 0,
      switch: false,
      finished: false,
      changing: false,
      reset: false,
      finalV: [],
      final: [],
      backQ: [],
    };
    this._handleBack = this._handleBack.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._handleDir = this._handleDir.bind(this);
    this._handleFTurn = this._handleFTurn.bind(this);
    this._handleSalto = this._handleSalto.bind(this);
    this._handleBP = this._handleBP.bind(this);
    this._handleSTurn = this._handleSTurn.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._parseDir = this._parseDir.bind(this);
    this._parseBP = this._parseBP.bind(this);
    this._parseTurn = this._parseTurn.bind(this);
  }

  componentDidUpdate() {
    if (this.state.switch) {
      if (this.state.reset) {
        setTimeout(() => {
          this.setState({
            nextItem: {
              q: 'What direction will you face jumping off the springboard?',
              names: ['Forward', 'Backward'],
              values: ['f', 'b'],
            },
            dir: 'f',
            fTurn: 'z',
            salto: 'z',
            sTurn: 'zero',
            bp: 's',
            backFlag: false,
            activePage: 1,
            finished: false,
            changing: true,
            reset: false,
            finalV: [],
            final: [],
            backQ: [],
          });
        }, 400);
      } else if (this.state.backFlag) {
        let setObj = {
          backFlag: false,
          changing: true,
        };
        let count = this.state.activePage;
        let resThree = parseThree(
          this.state.dir + this.state.fTurn + this.state.salto
        );
        if (count === 1) {
          setObj.nextItem = {
            q: 'What direction will you face jumping off the springboard?',
            names: ['Forward', 'Backward'],
            values: ['f', 'b'],
          };
        } else if (count === 2) {
          setObj.nextItem = {
            q: 'How many turns will you take from springboard to apparatus?',
            names: ['0', '1 (180°)', '2 (360°)'],
            values: ['z', 'o', 't'],
          };
        } else if (count === 3) {
          setObj.nextItem = {
            q: 'How many saltos will you perform?',
            names: ['0', '1', '2'],
            values: ['z', 'o', 't'],
          };
        } else if (count === 4) {
          setObj.nextItem = {
            q:
              'What body position will you maintain from apparatus to landing?',
            names: resThree.names,
            values: resThree.values,
          };
        }
        setTimeout(() => {
          this.setState({ ...this.state, ...setObj });
        }, 400);
      } else {
        if (!this.state.finished) {
          if (this.state.changing) {
            setTimeout(() => {
              let hold = [this.state.nextItem];
              this.setState({
                items: hold,
                nextItem: {},
                switch: false,
                changing: false,
              });
            }, 400);
          } else {
            let setObj = {
              backFlag: false,
              changing: true,
            };
            let currNum = this.state.activePage;
            let arr = this.state.backQ;
            arr.push(currNum);
            setObj.backQ = arr;
            if (currNum === 0) {
              setObj.nextItem = {
                q: 'What direction will you face jumping off the springboard?',
                names: ['Forward', 'Backward'],
                values: ['f', 'b'],
              }
              setObj.activePage = 1;
            } else if (currNum === 1) {
              setObj.nextItem = {
                q:
                  'How many turns will you take from springboard to apparatus?',
                names: ['0', '1 (180°)', '2 (360°)'],
                values: ['z', 'o', 't'],
              };
              setObj.activePage = 2;
            } else if (currNum === 2) {
              let resTwo = parseTwo(this.state.dir + this.state.fTurn);
              if (typeof resTwo === 'string') {
                setObj.activePage = 5;
                setObj.nextItem = {
                  q: 'How many turns will you take from apparatus to landing?',
                  names: ['0', '1 (180°)', '2 (360°)'],
                  values: ['zero', 'one', 'two'],
                };
              } else {
                setObj.activePage = 3;
                setObj.nextItem = {
                  q: 'How many saltos will you perform?',
                  names: resTwo.names,
                  values: resTwo.values,
                };
              }
            } else if (currNum === 3) {
              let resThree = parseThree(
                this.state.dir + this.state.fTurn + this.state.salto
              );
              if (typeof resThree === 'string') {
                if (resThree === 'finished') {
                  let ans = finalVault(
                    this.state.dir +
                    this.state.fTurn +
                    this.state.salto +
                    this.state.bp +
                    this.state.sTurn
                  );
                  setObj.finished = true;
                  setObj.finalV = ans;
                } else {
                  let skipParse = parseFour(
                    this.state.dir +
                    this.state.fTurn +
                    this.state.salto +
                    resThree
                  );
                  setObj.activePage = 5;
                  setObj.bp = resThree;
                  setObj.nextItem = {
                    q:
                      'How many turns will you take from apparatus to landing?',
                    names: skipParse.names,
                    values: skipParse.values,
                  };
                }
              } else {
                setObj.nextItem = {
                  q:
                    'What body position will you maintain from apparatus to landing?',
                  names: resThree.names,
                  values: resThree.values,
                };
                setObj.activePage = 4;
              }
            } else if (currNum === 4) {
              let resFour = parseFour(
                this.state.dir +
                this.state.fTurn +
                this.state.salto +
                this.state.bp
              );
              if (typeof resFour === 'string') {
                let finalAns = finalVault(
                  this.state.dir +
                  this.state.fTurn +
                  this.state.salto +
                  this.state.bp +
                  this.state.sTurn
                );
                setObj.items = [];
                setObj.finished = true;
                setObj.finalV = finalAns;
              } else {
                setObj.activePage = 5;
                setObj.nextItem = {
                  q: 'How many turns will you make from apparatus to landing?',
                  ...resFour,
                };
              }
            } else {
              let finalAns = finalVault(
                this.state.dir +
                this.state.fTurn +
                this.state.salto +
                this.state.bp +
                this.state.sTurn
              );
              setObj.finished = true;
              setObj.items = [];
              setObj.finalV = finalAns;
            }
            setTimeout(() => {
              this.setState({
                ...this.state,
                ...setObj,
              });
            }, 400);
          }
        } else {
          setTimeout(() => {
            this.setState({
              switch: false,
              nextItem: {},
              final: this.state.finalV,
            });
          }, 400);
        }
      }
    }
  }

  _parseDir = lt => {
    if (lt === 'f') {
      return 'Forwards'
    } else {
      return 'Backwards'
    }
  }

  _parseTurn = lt => {
    if (lt === 'z') {
      return 0;
    } else if (lt === 'o') {
      return 1;
    } else {
      return 2;
    }
  };

  _parseBP = lt => {
    if (lt === 's') {
      return 'Straight';
    } else if (lt === '5') {
      return 'Tucked';
    } else {
      return 'Piked';
    }
  };

  _handleDir = event => {
    const value = event.target.value;
    this.setState({ dir: value });
  };
  _handleFTurn = event => {
    const value = event.target.value;
    this.setState({ fTurn: value });
  };
  _handleSalto = event => {
    const value = event.target.value;
    this.setState({ salto: value });
  };
  _handleBP = event => {
    const value = event.target.value;
    this.setState({ bp: value });
  };
  _handleSTurn = event => {
    const value = event.target.value;
    this.setState({ sTurn: value });
  };
  _handleBack = () => {
    let arr = this.state.backQ;
    let next = arr.pop();
    this.setState({
      switch: true,
      activePage: next,
      backQ: arr,
      backFlag: true,
    });
  };

  _handleNext = () => {
    this.setState({ switch: true });
  };

  _handleReset = () => {
    this.setState({ switch: true, reset: true });
  };

  render() {
    const currState = this.state;
    const items = currState.items != [] ? currState.items[0] : null;
    const currNum = currState.activePage;
    const currQ =
      currNum === 1
        ? 'dir'
        : currNum === 2
          ? 'fTurn'
          : currNum === 3
            ? 'salto'
            : currNum === 4
              ? 'bp'
              : 'sTurn';
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Animate show={!currState.switch} type="slide" duration={400}>
            {!currState.finished && currState.final != [] ? (
              currNum === 0 ? (
                <Intro>
                  <h1>
                    Explore the 80 vaults defined by the Code of Points for
                    Women&apos;s Artistic Gymnastics. Each result includes
                    starting point values and ID number.
                  </h1>
                </Intro>
              ) : (
                <Wrapper>
                  {!currState.changing ? (
                    <Question>{currState.items[0].q}</Question>
                  ) : null}
                  {!currState.changing
                    ? items.values.map((aItem, aI) => {
                      return (
                        <Item key={items.names[aI] + aI}>
                          <RadioButton
                            type="radio"
                            name={currState.activePage}
                            value={aItem}
                            checked={currState[currQ] === aItem}
                            onChange={event => {
                              currNum === 1
                                ? this._handleDir(event)
                                : currNum === 2
                                  ? this._handleFTurn(event)
                                  : currNum === 3
                                    ? this._handleSalto(event)
                                    : currNum === 4
                                      ? this._handleBP(event)
                                      : this._handleSTurn(event);
                            }}
                          />
                          <RadioButtonLabel />
                          <div>
                            {items.names[aI]}
                          </div>
                        </Item>
                      );
                    })
                    : null}
                </Wrapper>
              )
            ) : (
              <FinalContainer>
                <h1>{currState.final[0]}</h1>
                <h2>
                  FIG Code of Points Value:{' '}
                  <font color="red">{currState.final[2]}</font>
                </h2>
                <h2>
                  FIG Code of Points ID:{' '}
                  <font color="blue">
                    {currState.final.length > 0
                      ? currState.final[1].toFixed(2)
                      : null}
                  </font>
                </h2>
                <div>
                  <h3>
                    Direction:{' '}
                  </h3>
                  <h3>
                    Pre-Flight Turns:{' '}
                  </h3>
                  <h3>
                    Saltos:{' '}
                  </h3>
                  <h3>
                    Body Position:{' '}
                  </h3>
                  <h3>
                    Flight Turns:{' '}
                  </h3>
                  <h3>
                    <font color="green">{this._parseDir(currState.dir)}</font>
                  </h3>
                  <h3>
                    <font color="purple">{this._parseTurn(currState.fTurn)}</font>
                  </h3>
                  <h3>
                    <font color="orange">{this._parseTurn(currState.salto)}</font>
                  </h3>
                  <h3>
                    <font color="pink">{this._parseBP(currState.bp)}</font>
                  </h3>
                  <h3>
                    <font color="yellow">{this._parseTurn(currState.sTurn)}</font>
                  </h3>
                </div>

              </FinalContainer>
            )}
            {!currState.finished ? (
              <NextBottom>
                <div>
                  &nbsp;
                </div>
                <ButtonGrid>
                  {currNum > 1 ? (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={this._handleBack}
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={this._handleNext}
                  >
                    {currNum === 0 ? 'Start!' : 'Next'}
                  </Button>
                </ButtonGrid>
              </NextBottom>
            ) : (
              <FlexBottom>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={this._handleReset}
                >
                  Build Another Vault!
                </Button>
              </FlexBottom>
            )}
          </Animate>
        </Container>
      </ThemeProvider>
    );
  }
}

export default VaultComp;
