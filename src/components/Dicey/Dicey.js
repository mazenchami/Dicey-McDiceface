/*
 * Dicey Component
 * - handles the dice element and wrapper of the game
 *
 * <Dicey
 *    diceRef={dice => this._reactDice = dice}
 *    onClick={isRolling ? () => null : () => this.setState({ isRolling: true, }, () => this._reactDice.rollAll())}
 *    rollDone={this._rollDone}
 * />
 *
 */

// import core React items
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import third part libraries
import _ from 'lodash';
import { Overlay, Tooltip, } from 'react-bootstrap';
import ReactDice from 'react-dice-complete';

// css import files
import 'react-dice-complete/dist/react-dice-complete.css';
import './dicey.css';

class Dicey extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
        };
        this._reactDiceWrapper = null;
        this._timer = null;
    }

    componentDidMount = () => {
        if(this.props.showTooltip) {
            this._timer = _.delay(() => this.setState({ showTooltip: true, }, () => clearInterval(this._timer)), 500);
        }
    }

    componentWillUnmount = () => {
        // timer is cleared to prevent any memory leaks
        clearInterval(this._timer);
    }

    _onDiceClick = () => this.setState(
        { showTooltip: false, },
        () => this.props.onClick(),
    )

    render = () => {
        const {
            diceRef,
            dotColor,
            dieSize,
            faceColor,
            outline,
            outlineColor,
            rollDone,
            rollTime,
            tooltipText,
        } = this.props;
        const { showTooltip, } = this.state;
        return (
            <div className={'center-content dice-container'}>
                <div onClick={this._onDiceClick} ref={diceWrapperRef => this._reactDiceWrapper = diceWrapperRef}>
                    <ReactDice
                        disableIndividual={true} // {Bool} - false - disable clicks on die to roll each individually
                        dotColor={dotColor} // {String} - #1eff00 - hex color code for the dots on the die
                        dieSize={dieSize} // {Number} - 60 - px width/height of each dice face
                        faceColor={faceColor} // {String} - #ff00ac - hex color code for the face of the die
                        margin={0} // {Number} - 15 - margin between each die
                        numDice={1} // {Number} - 4 - The number of dice you wish to have
                        outline={outline} // {Bool} - false - Show a 1px outline for each face of the die
                        outlineColor={outlineColor} // {String} - #000000 - hex color code for outline color if outline is true
                        ref={dice => diceRef(dice)}
                        rollDone={rollDone} // {String/Function} - null - callback returns total & individual values from dice roll
                        rollTime={rollTime} // {Number} - 2 - time in seconds for the roll animation
                    />
                </div>
                <Overlay target={this._reactDiceWrapper} show={showTooltip} placement={'top'}>
                    <Tooltip id={'tooltip'}>
                        {tooltipText}
                    </Tooltip>
                </Overlay>
            </div>
        );
    }
}

Dicey.propTypes = {
    diceRef:      PropTypes.func.isRequired,
    dotColor:     PropTypes.string,
    dieSize:      PropTypes.number,
    faceColor:    PropTypes.string,
    onClick:      PropTypes.func.isRequired,
    outline:      PropTypes.bool,
    outlineColor: PropTypes.string,
    rollDone:     PropTypes.func.isRequired,
    rollTime:     PropTypes.number,
    showTooltip:  PropTypes.bool,
    tooltipText:  PropTypes.string,
};

Dicey.defaultProps = {
    dotColor:     '#000000',
    dieSize:      75,
    faceColor:    '#FFFFFF',
    outline:      true,
    outlineColor: '#000000',
    rollTime:     0.5,
    showTooltip:  true,
    tooltipText:  'Click to roll',
};

export default Dicey;
