/*
 * Dicey McDiceface
 *
 * Game Description:
 * A six-sided die is rolled once every turn. The game visually tracks how many times each number has been rolled.
 * Once one specific number has been rolled 5 times, then that number is the winner, and the game is over.
 * The user can then start the game over, and they can also reset the game at any point.
 *
 */

// import core React items
import React, { PureComponent } from 'react';

// import third part libraries
import _ from 'lodash';
import { Button, Modal, OverlayTrigger, Row, Tooltip, } from 'react-bootstrap';
import { Fireworks, } from 'fireworks/lib/react';
import { MdHelpOutline, } from 'react-icons/md';

// import utils
import logic from './utils';

// import components
import { Scoreboard, } from './components/Scoreboard';
import { Dicey, } from './components/Dicey';
import { DiceyModal, } from './components/custom';

// css import files
import './App.css';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.defaultState = {
            counts: logic.getCounters(),
            isHelpModalOpen: false,
            isRolling:       false,
            winningNumber:   null,
        };
        this.state = this.defaultState;
        this._reactDice = null;
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
        const isResetBtnActive = !_.find(counts, (count, i) => count > 0);
        return (
            <div className={'App'}>
                <Row className={'header padding-vert-20'} id={'row'}>
                    <h1>{'Dicey McDiceface'}</h1>
                    <Row id={'header-icon-buttn-wrapper'}>
                        <MdHelpOutline
                            color={'grey'}
                            onClick={() => this.setState({ isHelpModalOpen: true, })}
                            size={'2em'}
                            style={{marginRight: '20px', cursor: 'pointer',}}
                        />
                        { isResetBtnActive ?
                            <OverlayTrigger
                                overlay={<Tooltip id={'tooltip-disabled'}>{'Start game to reset'}</Tooltip>}
                                placement={'bottom'}
                            >
                                <span className={'d-inline-block'}>
                                    <Button
                                        disabled={true}
                                        style={{pointerEvents: 'none',}}
                                        variant={'warning'}
                                    >
                                        {'New Game'}
                                    </Button>
                                </span>
                            </OverlayTrigger>
                            :
                            <Button
                                onClick={this._resetGame}
                                variant={'warning'}
                            >
                                {'New Game'}
                            </Button>
                        }
                    </Row>
                </Row>
                <div className={'main-container'}>
                    <Row className={'padding-vert-20'}>
                        <Dicey
                            diceRef={dice => this._reactDice = dice}
                            onClick={isRolling ? () => null : () => this.setState({ isRolling: true, }, () => this._reactDice.rollAll())}
                            rollDone={this._rollDone}
                        />
                        <Scoreboard
                            counts={counts}
                            numberOfDots={logic.returnWinningRollNumber()}
                        />
                    </Row>
                </div>
                { winningNumber &&
                    <Fireworks {...fxProps} />
                }
                <Modal
                    centered
                    className={'winning-modal'}
                    onHide={this._resetGame}
                    show={winningNumber ? true : false}
                >
                    <h1>{'Winning Number'}</h1>
                    <p className={'winning-number'}>{winningNumber}</p>
                    <Button variant={'success'} onClick={this._resetGame}>
                        {'Play Again'}
                    </Button>
                </Modal>
                <DiceyModal
                    bodyText={`Click the dice to roll. The Scoreboard will keep track of how many times a number has been rolled. First number to ${logic.returnWinningRollNumber()} wins!`}
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
