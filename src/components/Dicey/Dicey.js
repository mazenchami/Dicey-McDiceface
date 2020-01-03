/*
 * Dicey Component
 * - handles the dice element and wrapper of the game
 * <Dicey
 *    diceRef={dice => this._reactDice = dice}
 *    onClick={isRolling ? () => null : () => this.setState({ isRolling: true, }, () => this._reactDice.rollAll())}
 *    rollDone={this._rollDone}
 * />
 */

// import core React items
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import third part libraries
import ReactDice from 'react-dice-complete';

// css import files
import 'react-dice-complete/dist/react-dice-complete.css';
import './dicey.css';

class Dicey extends PureComponent {
    render = () => {
        const {
            diceRef,
            dotColor,
            dieSize,
            faceColor,
            onClick,
            outline,
            outlineColor,
            rollDone,
        } = this.props;
        return (
            <div className={'center-content dice-container'}>
                <div onClick={onClick}>
                    <ReactDice
                        disableIndividual={true} // {Bool} false disable clicks on die to roll each individually
                        dotColor={dotColor} // {String} #1eff00 hex color code for the dots on the die
                        dieSize={dieSize} // {Number} 60 px width/height of each dice face
                        faceColor={faceColor} // {String} #ff00ac hex color code for the face of the die
                        margin={0} // {Number} 15 margin between each die
                        numDice={1} // {Number} 4 The number of dice you wish to have
                        outline={outline} // {Bool} false Show a 1px outline for each face of the die
                        outlineColor={outlineColor} // {String} #000000 hex color code for outline color if outline is true
                        ref={dice => diceRef(dice)}
                        rollDone={rollDone} // {String/Function} null callback returns total & individual values from dice roll
                    />
                </div>
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
};

Dicey.defaultProps = {
    dotColor:     '#FFFFFF',
    dieSize:      75,
    faceColor:    '#000000',
    outline:      true,
    outlineColor: '#000000',
};

export default Dicey;
