import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../components';

// import { Modal } from 'react-bootstrap';

// import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';

export class Roles extends Component {
    componentDidMount() {
        this.getAllRoles();
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
        // rolesApi
        //     .getAllRoles({'Authorization': this.props.user.token})
        //     .then(res => {
        //         if (res.status === 200) {
        //             return res.json();
        //         } else {
        //             throw new Error(res.statusText);
        //         }
        //     })
        //     .then(roles => {
        //        console.log('getAllRoles', roles);
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //         // this.handleError({}, false);
        //     });
    }
    removeRole(role) {
        this.props.rolesActions.role_delete(role);
    }
    render() {
        const { list } = this.props.roles;
        //TODO main table component
        return (
            <section className='roles-management'>
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
                                                        <Button onClick={this.removeRole.bind(this, item)}
                                                                bsStyle='danger'
                                                                bsSize='small'>
                                                            <FA name='times' />
                                                        </Button>
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