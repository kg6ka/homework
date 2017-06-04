import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import {
  ButtonLink,
  SubHeader,
  MainTable,
  Spinner
} from '../../components';

import ModalDeleteRole from './Modal';

import Notifications, {notify} from 'react-notify-toast';

import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';
import * as UserActions from '../../actions/UserActions';

import { handleErrors } from '../../utils/handleErrors';

import StorageServiceClass from '../../utils/StorageService';

const StorageService = new StorageServiceClass();

const notifyOptions = {
  message: 'Роль успешно удалена',
  type: 'custom',
  timeout: 1500,
  color: {
    background: '#18a689',
    text: '#fff'
  }
};

export class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      roleID: null,
      value: '',
      roleOfReplace: null
    };
  }
  componentDidMount() {
    this.getAllRoles();
  }
  get userToken() {
    return this.props.user.token;
  }
  showModal(id) {
    this.setState({
      modalShow: true,
      roleID: id
    });
  }
  closeModal() {
    this.setState({ modalShow: false });
  }
  getAllRoles() {
    this.props.rolesActions.roles_request();

    rolesApi
      .getAllRoles({'Authorization': this.userToken})
      .then(handleErrors)
      .then(list => {
        this.props.rolesActions.roles_success({list: list});
        this.setRoleList(list);
      })
      .catch(error => {
        console.log(error.message);
        // this.handleError({}, false);
      });
  }
  deleteRole(queryParams) {
    this.props.rolesActions.delete_role_request();

    //TODO move to action!!
    rolesApi
      .deleteRole({'Authorization': this.userToken}, queryParams)
      .then(handleErrors)
      .then(role => {
        this.props.rolesActions.delete_role_success({id: queryParams.delete});
        this.closeModal();
        // let list = list.splice()
        // StorageService.set('roleList', list);
        return role;
      })
      .then(() => {
        this.showNotify();
      })
      .catch(error => {
        console.log(error.message);
        this.props.rolesActions.delete_role_fail();
      });
  }
  handleSubmit(params) {
    this.deleteRole(params);
  }
  setRoleList(list) {
    StorageService.set('roleList', list);
  }
  showNotify() {
    notify.show(
      notifyOptions.message,
      notifyOptions.type,
      notifyOptions.timeout,
      notifyOptions.color
    );
  }

  onSelectChange(value) {
    this.setState({ value });
    this.setState({roleOfReplace: this.replacedRoleID(value)});
  }

  replacedRoleID(value) {
    if(!value) return false;
    return this.roleList
      .filter(item => item.name.indexOf(value) !== -1)[0].id;
  }

  get roleList() {
    return this.props.roles.list;
  }
  get tableOptions() {
    return {
      thead: ['№', 'Role', 'Permissions', 'Controls'],
      tbody: this.roleList,
      permissions: true,
      showModal: ::this.showModal
    };
  }
  render() {
    //TODO main table component
    return (
      <section className='roles-management inside-notify'>
        <SubHeader title='Управление ролями' />
        <div className='ibox-title animated fadeInRight'>
          <ButtonLink className='btn btn-sm btn-primary'
                      to='role-management/create'>
            <FA name='plus' className='m-r-xs' />
            Создать роль
          </ButtonLink>
        </div>
        {this.roleList.length > 0 ?
          <div className='clearfix animated fadeInRight'>
            <div className='col-lg-12'>
              <div className="ibox-content row">
                <MainTable options={this.tableOptions} disable={true} />
              </div>
            </div>
          </div> : null
        }
        <ModalDeleteRole show={this.state.modalShow}
                         id={this.state.roleID}
                         onHide={::this.closeModal}
                         data-state={this.state}
                         data-list={this.roleList}
                         data-onDelete={::this.handleSubmit}
                         data-onSelectChange={::this.onSelectChange}
        />
        <Spinner data-show={this.props.roles.fetching}/>
        <Notifications />
      </section>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    roles: state.roles,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    rolesActions: bindActionCreators(RolesActions, dispatch),
    UserActions: bindActionCreators(UserActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
