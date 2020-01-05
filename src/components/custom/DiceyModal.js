/*
 * Dicey Modal Component
 * - custom modal component
 *
 * <DiceyModal
 *    bodyText={winningNumber ? true : false}
 *    headerTitle={'Winning Number'}
 *    isOpen={winningNumber ? true : false}
 *    onClose={this._resetGame}
 * />
 *
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
        const {
            bodyText,
            closeText,
            footerVariant,
            headerTitle,
            isOpen,
            modalCentered,
            onClose,
            showHeaderClose,
        } = this.props;
        return (
            <Modal
                centered={modalCentered}
                onHide={onClose}
                show={isOpen}
            >
                <Modal.Header closeButton={showHeaderClose} className={showHeaderClose ? '' : 'centered-modal-title'}>
                    <Modal.Title>{headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bodyText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={footerVariant} onClick={onClose}>
                        {closeText}
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
    closeText:       PropTypes.string,
    footerVariant:   PropTypes.string,
    headerTitle:     PropTypes.string.isRequired,
    isOpen:          PropTypes.bool.isRequired,
    modalCentered:   PropTypes.bool,
    onClose:         PropTypes.func.isRequired,
    showHeaderClose: PropTypes.bool,
};

DiceyModal.defaultProps = {
    closeText:       'Close',
    footerVariant:   'secondary',
    modalCentered:   true,
    showHeaderClose: true,
};

export default DiceyModal;
