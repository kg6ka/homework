import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../components';

import ModalDeleteRole from './Modal';

import Notifications, {notify} from 'react-notify-toast';

import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';
import * as UserActions from '../../actions/UserActions';

import { handleErrors } from '../../utils/handleErrors';

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
            roleID: null
        };
    }
    componentDidMount() {
        this.getAllRoles();
    }
    get userToken() {
        return this.props.user.token;
    }
    showModal(id) {
        console.log('Item ID', id);
        this.setState({
            modalShow: true,
            roleID: id
        });
    }
    closeModal() {
        this.setState({ modalShow: false });
    }
    getAllRoles() {
        let self = this;
        self.props.rolesActions.roles_request();

        rolesApi
            .getAllRoles({'Authorization': self.userToken})
            .then(handleErrors)
            .then(list => {
                self.props.rolesActions.roles_success({list: list});
                self.setRoleList(list);
            })
            .catch(error => {
                console.log(error.message);
                // this.handleError({}, false);
            });
    }
    deleteRole(queryParams) {
        let self = this;
        self.props.rolesActions.delete_role_request();

        rolesApi
            .deleteRole({'Authorization': self.userToken}, queryParams)
            .then(handleErrors)
            .then(role => {
                self.props.rolesActions.delete_role_success({id: queryParams.delete});
                return role;
            })
            .then(() => {
                self.closeModal();
                self.showNotify();
            })
            .catch(error => {
                console.log(error.message);
                self.props.rolesActions.delete_role_fail();
            });
    }
    handleSubmit(params) {
        this.deleteRole(params);
    }
    setRoleList(list) {
        window.localStorage.setItem('roleList', JSON.stringify(list));
    }
    showNotify() {
        notify.show(
            notifyOptions.message,
            notifyOptions.type,
            notifyOptions.timeout,
            notifyOptions.color
        );
    }
    get roleList() {
        const { list } = this.props.roles;
        return list;
    }
    render() {
        //TODO main table component
        return (
            <section className='roles-management inside-notify'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Управление ролями
                        </h1>
                    </div>
                </header>
                <div className='ibox-title animated fadeInRight'>
                    <ButtonLink className='btn btn-sm btn-primary'
                                to='role-management/create'>
                        <FA name='plus' className='m-r-xs' />
                        Создать роль
                    </ButtonLink>
                </div>
                {this.roleList.length > 0 &&
                    <div className='clearfix animated fadeInRight'>
                        <div className='col-lg-12'>
                           <div className="ibox-content row">
                               <table className="table main-table">
                                   <thead>
                                       <tr>
                                           <th>№</th>
                                           <th>Роль</th>
                                           <th>Права</th>
                                           <th>Управление</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                   {
                                       this.roleList.map((item, index) =>
                                           <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <ul className='info-list'>
                                                        {
                                                            item.permissions.map(permission =>
                                                                <li key={permission.id}>
                                                                    <span className='label btn-status label-primary'>
                                                                        {permission.name.toLowerCase()}
                                                                    </span>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </td>
                                                <td>
                                                    <div className='btn-holder'>
                                                        <ButtonLink className='btn btn-success btn-sm'
                                                                    to={`role-management/edit/${item.id}`}>
                                                            <FA name='pencil-square-o' />
                                                        </ButtonLink>
                                                        <Button onClick={this.showModal.bind(this, item.id)}
                                                                bsStyle='danger'
                                                                bsSize='small'>
                                                            <FA name='times' />
                                                        </Button>
                                                        {/*<Button onClick={this.removeRole.bind(this, item)}
                                                                bsStyle='danger'
                                                                bsSize='small'>
                                                            <FA name='times' />
                                                        </Button>*/}
                                                    </div>
                                                </td>
                                           </tr>
                                       )
                                   }
                                   </tbody>
                               </table>
                           </div>
                        </div>
                    </div>
                }
                <ModalDeleteRole show={this.state.modalShow}
                                 id={this.state.roleID}
                                 onHide={::this.closeModal}
                                 data-onDelete={::this.handleSubmit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Roles)