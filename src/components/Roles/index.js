import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../components';

import ModalDeleteRole from './Modal';

import Notifications, {notify} from 'react-notify-toast';

// import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';

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
            modalShow: false
        }
    }
    componentDidMount() {
        this.getAllRoles();
    }
    showModal(id) {
        console.log('Item ID', id);
        this.setState({ modalShow: true });
    }
    closeModal() {
        this.setState({ modalShow: false });
    }
    getAllRoles() {
        this.props.rolesActions.roles_request();
        this.props.rolesActions.roles_success({
            list: [
                {
                    id: 1,
                    name: 'Админ',
                    permissions: ['create', 'edit', 'review', 'reject']
                },
                {
                    id: 2,
                    name: 'Рецензент',
                    permissions: ['review', 'reject']
                }
            ]
        });
        /*rolesApi
            .getAllRoles({'Authorization': this.props.user.token})
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(roles => {
               console.log('getAllRoles', roles);
            })
            .catch(error => {
                console.log(error.message);
                // this.handleError({}, false);
            });*/
    }
    removeRole(role) {
        this.props.rolesActions.role_delete(role);
        notify.show(
            notifyOptions.message,
            notifyOptions.type,
            notifyOptions.timeout,
            notifyOptions.color
        );
    }
    render() {
        const { list } = this.props.roles;
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
                {list.length > 0 &&
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
                                       list.map((item, index) =>
                                           <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <ul className='info-list'>
                                                        {
                                                            item.permissions.map(permission =>
                                                                <li key={permission}>
                                                                    <span className='label btn-status label-primary'>
                                                                        {permission}
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
                                 onHide={::this.closeModal}/>
                <Notifications />
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        roles: state.roles
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        rolesActions: bindActionCreators(RolesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles)