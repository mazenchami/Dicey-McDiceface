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
import React, { PureComponent } from 'react';

// import third part libraries
import _ from 'lodash';
import { Button, } from 'react-bootstrap';
import { Fireworks, } from 'fireworks/lib/react';
import { MdHelpOutline, } from 'react-icons/md';
import ReactDice from 'react-dice-complete';

// import utils
import logic from './utils';

// import components
import { Counter, } from './components/Counter';
import { DiceyModal, } from './components/custom';

// css import files
import 'react-dice-complete/dist/react-dice-complete.css';
import './App.css';

// setup constants
const WINNING_ROLL_NUMBER = 5;
const NUMBERS_TO_WORDS = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
];

class App extends PureComponent {
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
            isHelpModalOpen: false,
            isRolling:       false,
            winningNumber:   null,
        };
        this.state = this.defaultState;
        this._reactDice = null;
        this._timer = null;
    }

    componentWillUnmount = () => {
        clearInterval(this._timer);
    }

    _resetGame = () => this.setState(this.defaultState)

    _rollDone = num => {
        let newCountsState = _.cloneDeep(this.state.counts);
        let newCount = (newCountsState[NUMBERS_TO_WORDS[num]] + 1);
        newCountsState = _.update(newCountsState, NUMBERS_TO_WORDS[num], () => newCount);
        this.setState({
            counts:        newCountsState,
            isRolling:     false,
            winningNumber: newCount === WINNING_ROLL_NUMBER ? num : null,
        });
    }

    render = () => {
        const { counts, isHelpModalOpen, isRolling, winningNumber, } = this.state;
        const fxProps = logic.returnFireworksProps();
        return (
            <div className={'App'}>
                <div className={'row padding-vert-20'}>
                    <h1>{'Dicey McDiceface'}</h1>
                    <MdHelpOutline
                        color={'grey'}
                        onClick={() => this.setState({ isHelpModalOpen: true, })}
                        size={'2em'}
                        style={{marginLeft: '20px',}}
                    />
                </div>
                <div className={'row padding-vert-20'}>
                    <div className={'center-content dice-container'}>
                        <div onClick={isRolling ? () => null : () => this.setState({ isRolling: true, }, () => this._reactDice.rollAll())}>
                            <ReactDice
                                disableIndividual={true} // {Bool} false disable clicks on die to roll each individually
                                dieSize={75}
                                dotColor={'#FFFFFF'} // {String} #1eff00 hex color code for the dots on the die
                                faceColor={'#000000'} // {String} #ff00ac hex color code for the face of the die
                                margin={0} // {Number} 15 margin between each die
                                numDice={1} // {Number} 4 The number of dice you wish to have
                                outline={true} // {Bool} false Show a 1px outline for each face of the die
                                outlineColor={'#000000'} // {String} #000000 hex color code for outline color if outline is true
                                ref={dice => this._reactDice = dice}
                                rollDone={this._rollDone} // {String/Function} null callback returns total & individual values from dice roll
                            />
                        </div>
                    </div>
                    <Counter
                        counts={counts}
                    />
                </div>
                <div className={'padding-vert-20'}>
                    <Button onClick={this._resetGame} variant={'warning'}>
                        {'Reset Game'}
                    </Button>
                </div>
                { winningNumber &&
                    <Fireworks {...fxProps} />
                }
                <DiceyModal
                    bodyText={<p className={'winning-number'}>{winningNumber}</p>}
                    headerTitle={'Winning Number'}
                    isOpen={winningNumber ? true : false}
                    onClose={this._resetGame}
                />
                <DiceyModal
                    bodyText={'Click the dice to roll. Once one specific number has been rolled 5 times, then that number is the winner, and the game is over. Enjoy!'}
                    headerTitle={'How To Play Dicey McDiceface'}
                    isOpen={isHelpModalOpen}
                    onClose={() => this.setState({ isHelpModalOpen: false, })}
                />
                <footer>
                    <p>{`\u00A9 ${new Date().getFullYear()} Mazen Chami`}</p>
                </footer>
            </div>
        );
    }
}

export default App;
