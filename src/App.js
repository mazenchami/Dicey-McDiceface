/*
 * Dicey McDiceface
 *
 * Game Description:
 * A six-sided die is rolled once every turn. The game will visually track how many of each number have been rolled, like how many 1s, 2s, etc. Once one specific number has been rolled 5 times, then that number is the winner, and the game is over. The user can then start the game over, and they can also reset the game at any point.
 *
 */

// import core React items
import React, { PureComponent } from 'react';

// import third part libraries
import { Button, } from 'react-bootstrap';
import { Fireworks, } from 'fireworks/lib/react';
import { MdHelpOutline, } from 'react-icons/md';

// import utils
import logic from './utils';

// import components
import { Counter, } from './components/Counter';
import { Dicey, } from './components/Dicey';
import { DiceyModal, } from './components/custom';

// css import files
import './App.css';

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
        const { counts, } = this.state;
        const { newCount, newCountsState, } = logic.handleRollDoneLogic(num, counts);
        this.setState({
            counts:        newCountsState,
            isRolling:     false,
            winningNumber: newCount === logic.returnWinningRollNumber() ? num : null,
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
                    <Dicey
                        diceRef={dice => this._reactDice = dice}
                        onClick={isRolling ? () => null : () => this.setState({ isRolling: true, }, () => this._reactDice.rollAll())}
                        rollDone={this._rollDone}
                    />
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
                <footer className={'footer'}>
                    <p>{`\u00A9 ${new Date().getFullYear()} Mazen Chami`}</p>
                </footer>
            </div>
        );
    }
}

export default App;
