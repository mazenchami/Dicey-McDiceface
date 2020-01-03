/*
 * Dicey McDiceface
 *
 * Game Description:
 * A six-sided die is rolled once every turn. The game will visually track how many of each number have been rolled, like how many 1s, 2s, etc. Once one specific number has been rolled 5 times, then that number is the winner, and the game is over. The user can then start the game over, and they can also reset the game at any point.
 *
 * Instructions
 * Create a website for the above game. The instructions are minimal, so it’s up to you to figure out a great user experience and also develop cleanly. When you’re done, upload your code to a GitHub repo with instructions on how to run locally.
 *
 * We’ll evaluate your solution based on functionality, user experience, code quality, and maintainability. Feel free to be creative in bringing this game to life.
 *
 */
// import core React items
import React, { Component } from 'react';

// import third part libraries
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { Fireworks, } from 'fireworks/lib/react';
import ReactDice from 'react-dice-complete';

// css import files
import 'react-dice-complete/dist/react-dice-complete.css';
import './App.css';

// setup constants
const WINNING_ROLL_NUMBER = 2; // TODO: REVERT ME 5;
const NUMBERS_TO_WORDS = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
];

class App extends Component {
  constructor(props) {
      super(props);
      this.defaultState = {
          counts: {
              one:   0,
              two:   0,
              three: 0,
              four:  0,
              five:  0,
              six:   0,
          },
          isRolling: false,
          winningNumber: null,
      };
      this.state = this.defaultState;
      this._timer = null;
      this.reactDice = null;
  }

  componentWillUnmount = () => {
      clearInterval(this._timer);
  }

  _resetGame = () => this.setState(this.defaultState)

  _rollDone = num => {
      let newCountsState = _.cloneDeep(this.state.counts);
      let newCount = (newCountsState[NUMBERS_TO_WORDS[num]] + 1);
      newCountsState = _.update(newCountsState, NUMBERS_TO_WORDS[num], () => newCount);
      this.setState(
          {
              counts: newCountsState,
              winningNumber: newCount === WINNING_ROLL_NUMBER ? num : null,
          },
          () => newCount === WINNING_ROLL_NUMBER ? this._timer = _.delay(() => this._resetGame(), 2000) : null,
      );
  }

  render = () => {
      const { counts, winningNumber, } = this.state;
      const fxProps = {
          count: 3, // Count of the fireworks that are rendered concurrently
          interval: 500, // Interval in milliseconds for how often new fireworks get rendered
          colors: ['#cc3333', '#4CAF50', '#81C784'],
          calc: (props, i) => ({
              ...props,
              x: ((i + 1) * (window.innerWidth / 3) - (i + 1) * 100),
              y: (200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0))
          }) // Calc is a function that can be evaluated to generate `FireworksInput`
      };
      return (
          <div className={'App'}>
              <div className={'padding-vert-20'}>
                  <h1>{'Dicey McDiceface'}</h1>
                  <h3>{'by: Mazen Chami'}</h3>
              </div>
              <div className={'row test padding-vert-20'}>
                  <div className={'test2 center-content dice-container'}>
                      <ReactDice
                          dieSize={75}
                          dotColor={'#FFFFFF'} // {String} #1eff00 hex color code for the dots on the die
                          faceColor={'#000000'} // {String} #ff00ac hex color code for the face of the die
                          margin={0} // {Number} 15 margin between each die
                          numDice={1} // {Number} 4 The number of dice you wish to have
                          outline={true} // {Bool} false Show a 1px outline for each face of the die
                          outlineColor={'#000000'} // {String} #000000 hex color code for outline color if outline is true
                          ref={dice => this.reactDice = dice}
                          rollDone={this._rollDone} // {String/Function} null callback returns total & individual values from dice roll
                      />
                  </div>
                  <div className={'test3 center-content count-container'}>
                      <h4>{'Dice Count:'}</h4>
                      <p>{`1: ${counts.one}`}</p>
                      <p>{`2: ${counts.two}`}</p>
                      <p>{`3: ${counts.three}`}</p>
                      <p>{`4: ${counts.four}`}</p>
                      <p>{`5: ${counts.five}`}</p>
                      <p>{`6: ${counts.six}`}</p>
                  </div>
              </div>
              <div className={'padding-vert-20'}>
                  <Button onClick={this._resetGame} variant={'warning'}>
                      {'Reset Game'}
                  </Button>
              </div>
              { winningNumber &&
                  <div className={'modal'}>
                      <Fireworks {...fxProps} />
                      <div className={'winning-number-container'}>
                          <p className={'winning-number-p'}>{'Winning Number'}</p>
                          <p className={'winning-number'}>{winningNumber}</p>
                      </div>
                  </div>
              }
          </div>
      );
  }
}

export default App;
