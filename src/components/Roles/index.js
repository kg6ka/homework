import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';

export class Roles extends Component {
    componentDidMount() {
        this.getAllRoles();
    }
    getAllRoles() {
        console.log('componentWillMount', this.props);
        this.props.actions.roles_request();
        rolesApi
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
            });
    }
    render() {
        return (
            <h1>Роли</h1>
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