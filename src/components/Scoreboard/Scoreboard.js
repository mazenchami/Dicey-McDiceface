/*
 * Scoreboard Component
 * - handles the scoring element of the game
 *
 * <Scoreboard
 *    counts={{ one: 1, two: 0, three: 2, ... }}
 *    numberOfDots={logic.returnWinningRollNumber()}
 * />
 *
 */

// import core React items
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import third part libraries
import _ from 'lodash';
import { Col, Row, } from 'react-bootstrap';

// import utils
import logic from '../../utils';

// css import files
import './scoreboard.css';

const ScoreItem = ({ activeItems, number, numberOfDots, }) => (
    <Col xs={6} md={3} className={'score-dice-wrapper'}>
        <span className={`score-dice score-dice-${number}`} title={`Dice ${number}`}></span>
        <div className={'dots-wrapper'}>
            {_.map(_.range(1, (numberOfDots + 1)), index =>
                <span key={index} className={`empty-dot ${activeItems >= index ? 'active' : ''}`}></span>
            )}
        </div>
    </Col>
);

class Scoreboard extends PureComponent {
    render = () => {
        const { counts, numberOfDots, } = this.props;
        const numberOfFaces = logic.returnNumberOfFaces();
        return (
            <div className={'center-content count-container'}>
                <h3>{'Scoreboard'}</h3>
                <Row>
                    {_.map(_.range(1, (numberOfFaces + 1)), index =>
                        <ScoreItem
                            activeItems={counts[logic.returnNumbersToWords()[index]]}
                            key={index}
                            number={index}
                            numberOfDots={numberOfDots}
                        />
                    )}
                </Row>
            </div>
        );
    }
}

Scoreboard.propTypes = {
    counts:       PropTypes.object.isRequired,
    numberOfDots: PropTypes.number.isRequired,
};

export default Scoreboard;
