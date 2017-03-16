import React, { Component } from 'react';
// import FA from 'react-fontawesome';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Select from 'react-select';

export default class ModalDeleteRole extends Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {
            canSubmit: false,
            options: [],
            value: ''
        };
        self.roleOfDelete = null;
        self.roleOfReplace = null;
        self.optionsList = [];
    }
    componentWillReceiveProps(nextProps) {
        this.changedRoleList(nextProps.id);
        this.setState({value: ''});
        this.setState({roleOfDelete: nextProps.id})
    }

    changedRoleList(id) {
        let self = this;
        if (!self.roleList.length) return null;
        self.optionsList = self.roleList
            .filter(item => item.id !== id)
            .map(item => {
                item.value = item.name;
                item.label = item.name;
                return item;
        });
    }

    get roleList() {
        return JSON.parse(window.localStorage.getItem('roleList')) || [];
    }

    handleSelectChange(value) {
        this.setState({ value });
        this.setState({roleOfReplace: this.replacedRoleID(value)});
    }

    replacedRoleID(value) {
        return this.roleList
            .filter(item => item.name.indexOf(value) !== -1)[0].id;
    }

    handleSubmit() {
        let params = {
            delete: this.state.roleOfDelete,
            replace: this.state.roleOfReplace
        };
        this.props['data-onDelete'](params);
    }

    render() {
        return (
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Удаление роли</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Wrapped Text</h4>
                    <Select simpleValue
                            value={this.state.value}
                            placeholder='Select your favourite(s)'
                            options={this.optionsList}
                            onChange={::this.handleSelectChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='primary'
                            bsSize='small'
                            onClick={::this.handleSubmit}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
