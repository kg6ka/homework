import React, { Component } from 'react';
import FA from 'react-fontawesome';
import {
  Modal,
  Button
} from 'react-bootstrap';

import Select from 'react-select';

export default class ModalDeleteRole extends Component {
  componentWillReceiveProps(nextProps) {
    this.changedRoleList(nextProps.id);
    this.roleId = nextProps.id;
  }

  changedRoleList(id) {
    if (!this.props['data-list'].length) return null;
    this.optionsList = this.props['data-list']
      .filter(item => item.id !== id)
      .map(item => {
        item.value = item.name;
        item.label = item.name;
        return item;
      }) || [];
  }

  onDelete() {
    let params = {
      delete: this.roleId,
      replace: this.props['data-state'].roleOfReplace
    };
    this.props['data-onDelete'](params);
  }

  render() {
    const value = this.props['data-state'].value;
    return (
      <Modal {...this.props}
             bsSize='small'
             aria-labelledby='contained-modal-title-sm'>
          <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-sm'>Delete role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4>Reassign role</h4>
              <Select simpleValue
                      value={value}
                      placeholder='Pick role'
                      options={this.optionsList}
                      onChange={this.props['data-onSelectChange']} />
          </Modal.Body>
          <Modal.Footer>
              <Button bsStyle='danger'
                      bsSize='small'
                      onClick={::this.onDelete}
                      disabled={!value}>
                  <FA name='trash-o'
                      className='m-r-xs'/>
                  Delete
              </Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
