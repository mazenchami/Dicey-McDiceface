/*
 * Counter Component
 * - handles the scoring element of the game
 * <Counter
 *    counts={{ one: 1, two: 0, three: 2, ... }}
 * />
 */

// import core React items
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import third part libraries
import { ListGroup, } from 'react-bootstrap';

// css import files
import './counter.css';

class Counter extends PureComponent {
    render = () => {
        const { counts, } = this.props;
        return (
            <div className={'center-content count-container'}>
                <h4>{'Dice Count:'}</h4>
                <ListGroup as="ul">
                    <ListGroup.Item
                        active={counts.one > 0}
                        as={'li'}
                    >
                        {`1: ${counts.one}`}
                    </ListGroup.Item>
                    <ListGroup.Item
                        active={counts.two > 0}
                        as={'li'}
                    >
                        {`2: ${counts.two}`}
                    </ListGroup.Item>
                    <ListGroup.Item
                        active={counts.three > 0}
                        as={'li'}
                    >
                        {`3: ${counts.three}`}
                    </ListGroup.Item>
                    <ListGroup.Item
                        active={counts.four > 0}
                        as={'li'}
                    >
                        {`4: ${counts.four}`}
                    </ListGroup.Item>
                    <ListGroup.Item
                        active={counts.five > 0}
                        as={'li'}
                    >
                        {`5: ${counts.five}`}
                    </ListGroup.Item>
                    <ListGroup.Item
                        active={counts.six > 0}
                        as={'li'}
                    >
                        {`6: ${counts.six}`}
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

Counter.propTypes = {
    counts: PropTypes.object.isRequired,
};

export default Counter;
