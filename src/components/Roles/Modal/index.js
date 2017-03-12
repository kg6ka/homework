import React, { Component } from 'react';
// import FA from 'react-fontawesome';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Select from 'react-select';

export default class ModalDeleteRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            crazy: false,
            canSubmit: false,
            fullField: false,
            roleName: '',
            options: [],
            value: ''
        };
    }

    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    render() {
        return (
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Удаление роли</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Wrapped Text</h4>
                    {/*<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/}
                    <Select multi
                            simpleValue
                            disabled={this.state.disabled}
                            value={this.state.value}
                            placeholder='Select your favourite(s)'
                            options={this.state.options}
                            onChange={::this.handleSelectChange} />
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
