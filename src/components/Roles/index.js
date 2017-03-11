import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../components';

// import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';

export class Roles extends Component {
    componentDidMount() {
        this.getAllRoles();
    }
    getAllRoles() {
        this.props.actions.roles_request();
        this.props.actions.roles_success({
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
        this.props.actions.role_delete(role);
    }
    render() {
        const { list } = this.props.roles;
        //TODO main table component
        return (
            <section className='roles-management'>
                <header className='sub-header clearfix white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='pull-left'>Управление ролями</h1>
                    </div>
                </header>
                <div className='ibox-title'>
                    <ButtonLink to='/role-management/create'>
                        <FA name='plus' className='m-r-xs' />
                        Создать
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
                                                                <li key={permission}>{permission}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </td>
                                                <td>
                                                    <div className='btn-holder'>
                                                        <Button bsStyle='success' bsSize='small'>
                                                            <FA name='pencil-square-o' />
                                                        </Button>
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
        actions: bindActionCreators(RolesActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles)