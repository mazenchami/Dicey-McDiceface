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
        return (
            <div className={'center-content count-container'}>
                <h3>{'Scoreboard'}</h3>
                <Row>
                    <ScoreItem
                        activeItems={counts.one}
                        number={1}
                        numberOfDots={numberOfDots}
                    />
                    <ScoreItem
                        activeItems={counts.two}
                        number={2}
                        numberOfDots={numberOfDots}
                    />
                    <ScoreItem
                        activeItems={counts.three}
                        number={3}
                        numberOfDots={numberOfDots}
                    />
                    <ScoreItem
                        activeItems={counts.four}
                        number={4}
                        numberOfDots={numberOfDots}
                    />
                    <ScoreItem
                        activeItems={counts.five}
                        number={5}
                        numberOfDots={numberOfDots}
                    />
                    <ScoreItem
                        activeItems={counts.six}
                        number={6}
                        numberOfDots={numberOfDots}
                    />
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
