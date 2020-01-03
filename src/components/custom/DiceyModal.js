/*
 * Dicey Modal Component
 * - custom modal component
 * <DiceyModal
 *    bodyText={winningNumber ? true : false}
 *    headerTitle={'Winning Number'}
 *    isOpen={winningNumber ? true : false}
 *    onClose={this._resetGame}
 * />
 */

// import core React items
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import third part libraries
import { Button, Modal, } from 'react-bootstrap';

// css import files
import './custom.css';

class DiceyModal extends PureComponent {
    render = () => {
        const { bodyText, headerTitle, isOpen, onClose, } = this.props;
        return (
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bodyText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'secondary'} onClick={onClose}>
                        {'Close'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DiceyModal.propTypes = {
    bodyText:    PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    headerTitle: PropTypes.string.isRequired,
    isOpen:      PropTypes.bool.isRequired,
    onClose:     PropTypes.func.isRequired,
};

export default DiceyModal;
