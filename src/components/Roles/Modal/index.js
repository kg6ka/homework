import React, { Component } from 'react';
// import FA from 'react-fontawesome';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class ModalDeleteRole extends Component {
    render() {
        return (
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Удаление роли</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Wrapped Text</h4>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
