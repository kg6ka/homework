import React, { Component } from 'react';
// import FA from 'react-fontawesome';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Select from 'react-select';

import * as rolesApi from '../../../utils/endpoints/rolesApi';
import { handleErrors } from '../../../utils/handleErrors';

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
        self.roleOfChange = null;
        self.optionsList = [];
    }
    componentWillReceiveProps(nextProps) {
        this.changedRoleList(nextProps.id);
        this.setState({value: ''});
    }

    changedRoleList(id) {
        let self = this;
        if (!self.roleList.length) return null;
        self.optionsList = self.roleList.filter(item => item.id !== id).map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    get roleList() {
        return JSON.parse(window.localStorage.getItem('roleList')) || [];
    }

    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
        console.log(this.props.show);
    }

    deleteRole(params) {
        this.props.rolesActions.delete_role_request();

        rolesApi
            .deleteRole({'Authorization': this.props.user.token}, params)
            .then(handleErrors)
            .then(role => {
                this.props.rolesActions.delete_role_success({deletedRole: role});
            })
            .catch(error => {
                console.log(error.message);
                this.props.rolesActions.delete_role_fail();
            });
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
                    <Button onClick={this.props.onHide}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
