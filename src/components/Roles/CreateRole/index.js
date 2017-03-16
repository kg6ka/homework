import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import RoleForm from '../../../components/Roles/RoleForm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as rolesApi from '../../../utils/endpoints/rolesApi';
import * as RolesActions from '../../../actions/RolesActions';
import * as UserActions from '../../../actions/UserActions';
import * as permissionsApi from '../../../utils/endpoints/permissionsApi';
import * as PermissionsAction from '../../../actions/PermissionsAction';

import Notifications, {notify} from 'react-notify-toast';
import { handleErrors } from '../../../utils/handleErrors';

import 'react-select/dist/react-select.css';

const notifyOptions = {
    message: 'Роль успешно создана',
    type: 'custom',
    timeout: 1500,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

const pageChangeDelay = 700;

export class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            crazy: false,
            canSubmit: false,
            fullField: false,
            roleName: '',
            options: [],
            value: '',
            permissions: []
        };
    }

    componentDidMount() {
        this.getAllPermissions();
    }

    get userToken() {
        return this.props.user.token;
    }

    getAllPermissions() {
        this.props.permissionActions.permissions_request();
        permissionsApi
            .getAllPermissions({'Authorization': this.userToken})
            .then(handleErrors)
            .then(list => {
                this.props.permissionActions.permissions_success({list});
            })
            .catch(error => {
                console.log(error.message);
                //TODO handle error global
                // handleError({}, false);
            });
    }

    createRole(params) {
        this.setState({fullField: false});
        this.props.rolesActions.create_role_request();

        rolesApi
            .createRole({'Authorization': this.userToken}, params)
            .then(handleErrors)
            .then(role => {
                this.props.rolesActions.create_role_success({role});
                this.showNotify();
                setTimeout(() => {
                    this.setState({fullField: true});
                    this.backToPrevious();
                }, pageChangeDelay);
            })
            .catch(error => {
                console.log(error.message);
                this.props.rolesActions.create_role_fail();
                // this.handleError({}, false);
            });
    }

    handleSelectChange(value) {
        this.setState({ value });
        if (this.state.canSubmit && value.length > 0) {
            this.setState({fullField: true});
        } else {
            this.setState({fullField: false});
        }
    }

    handleSubmit(data) {
        console.log(data);
        if (!this.state.fullField) {
            return false;
        }

        this.createRole({
            name: data.roleName,
            permissions: this.sendPermissionList
        });
    }

    enableButton() {
        this.setState({ canSubmit: true });
        if ((!this.state.canSubmit || this.state.canSubmit) && this.state.value.length > 0) {
            this.setState({fullField: true});
        } else {
            this.setState({fullField: false});
        }
    }

    disableButton() {
        this.setState({ canSubmit: false });
        if (this.state.canSubmit) {
            this.setState({fullField: false});
        }
    }

    get sendPermissionList() {
        let valueList = this.state.value.split(',');
        return this.permissionList.reduce((initialState, item) => {
            if (valueList.indexOf(item.value) !== -1) {
                initialState.push(item.id);
            }
            return initialState;
        }, []);
    }

    showNotify() {
        notify.show(
            notifyOptions.message,
            notifyOptions.type,
            notifyOptions.timeout,
            notifyOptions.color
        );
    }

    //TODO disabled of select
    // toggleDisabled (e) {
    //     this.setState({ disabled: e.target.checked });
    // }

    backToPrevious() {
        browserHistory.push('/role-management');
    }

    get permissionList() {
        const { list } = this.props.permissions;
        return list.map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    render() {
        return (
            <seection className='role-info inside-notify'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Создание роли
                        </h1>
                    </div>
                </header>
                {this.permissionList.length > 0 &&
                    <RoleForm onSubmit={::this.handleSubmit}
                              onValid={::this.enableButton}
                              onInvalid={::this.disableButton}
                              roleName={this.state.roleName}
                              disabledSelect={this.state.disabled}
                              value={this.state.value}
                              options={this.permissionList}
                              onChange={::this.handleSelectChange}
                              disabledSubmit={!this.state.fullField}
                              backToPrevious={::this.backToPrevious}
                    />
                }
                <Notifications />
            </seection>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        roles: state.roles,
        permissions: state.permissions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        rolesActions: bindActionCreators(RolesActions, dispatch),
        permissionActions: bindActionCreators(PermissionsAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole)
