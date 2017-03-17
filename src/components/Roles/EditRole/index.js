import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import RoleForm from '../../../components/Roles/RoleForm';
import { SubHeader } from '../../../components';

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

//TODO notifyOptions
const notifyOptions = {
    message: 'Роль успешно обновлена',
    type: 'custom',
    timeout: 1500,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

const pageChangeDelay = 700;

export class EditRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            fullField: false,
            roleName: '',
            options: [],
            value: '',
            permissions: []
        };
        this.roleID = +this.props.params.id;
    }

    get userToken() {
        return this.props.user.token;
    }

    componentDidMount() {
        this.getAllPermissions();
        this.getCurrentPermissions();
        this.currentRoleName();
    }

    currentRoleName() {
        const roleList = JSON.parse(window.localStorage.getItem('roleList'));
        if (roleList.length) {
            let roleName = roleList.filter(item => item.id === this.roleID)[0].name;
            this.setState({ roleName });
        }
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
                // this.handleError({}, false);
            });
    }

    editRole(params) {
        this.setState({fullField: false});
        this.props.rolesActions.edit_role_request();

        rolesApi
            .editRole({'Authorization': this.userToken}, params)
            .then(handleErrors)
            .then(role => {
                this.props.rolesActions.edit_role_success(role);
                this.showNotify();

                setTimeout(() => {
                    this.setState({fullField: true});
                    this.backToPrevious();
                }, pageChangeDelay);
            })
            .catch(error => {
                console.log(error.message);
                this.props.rolesActions.edit_role_fail();
                // this.handleError({}, false);
            });
    }

    getCurrentPermissions() {
        this.props.permissionActions.current_permissions_request();

        permissionsApi
            .getCurrentPermissions({'Authorization': this.userToken}, this.roleID)
            .then(handleErrors)
            .then(list => {
                this.props.permissionActions.current_permissions_success({list});
                return this.permissionList('currentList');
            })
            .then(list => {
                this.setState({ value: list });
            })
            .catch(error => {
                console.log(error.message);
                this.props.permissionActions.current_permissions_fail();
                //TODO handle error global
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
        let self = this;
        if (!self.state.fullField) {
            return false;
        }
        let newData = {
            id: self.roleID,
            name: data.roleName
        };
        if (!self.isChangedPermission) {
            newData = {
                id: self.roleID,
                name: data.roleName,
                permissions: self.permissionsIDs
            }
        }
        self.editRole(newData);
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

    permissionList(array) {
        const list = this.props.permissions[array];
        return list.map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    //TODO perhaps change logic for show/hide editForm
    // get currentPermissionList() {
    //     const { currentList } = this.props.permissions;
    //     return currentList.map(item => {
    //         item.value = item.name.toLowerCase();
    //         item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
    //         return item;
    //     });
    // }

    get permissionsIDs() {
        let self = this;
        return self.permissionList('list').reduce((initialState, item) => {
            if (self.selectedPermissionsName.indexOf(item.name) !== -1) {
                initialState.push(item.id);
            }
            return initialState;
        }, []);
    }

    get defaultPermissionsName() {
        return this.permissionList('currentList').map(item => {
            return item.name;
        });
    }

    get selectedPermissionsName() {
        let selectedValues = this.state.value;
        if (Array.isArray(selectedValues) && selectedValues.length) {
            return selectedValues.map(item => {
                return item.name;
            });
        } else {
            return this.state.value.toUpperCase().split(',');
        }
    }

    get isChangedPermission() {
        let self = this;
        return this.arrayEqual()(self.defaultPermissionsName)(self.selectedPermissionsName);
    }

    arrayEqual() {
        const equal = x => y => x === y;
        const arrayCompare = f=> ([x, ...xs]) => ([y, ...ys]) => {
            if (x === undefined && y === undefined) {
                return true;
            } else if (! f (x) (y)) {
                return false;
            } else {
                return arrayCompare (f) (xs) (ys)
            }
        };

        return arrayCompare(equal);
    }

    showNotify() {
        notify.show(
            notifyOptions.message,
            notifyOptions.type,
            notifyOptions.timeout,
            notifyOptions.color
        );
    }

    backToPrevious() {
        browserHistory.push('/role-management');
    }

    render() {
        return (
            <seection className='role-info inside-notify'>
                <SubHeader title='Редактирование роли'/>
                {this.permissionList('list').length > 0 &&
                    <RoleForm onSubmit={::this.handleSubmit}
                            onValid={::this.enableButton}
                            onInvalid={::this.disableButton}
                            roleName={this.state.roleName}
                            disabledSelect={this.state.disabled}
                            value={this.state.value}
                            options={this.permissionList('list')}
                            onChange={::this.handleSelectChange}
                            disabledSubmit={!this.state.fullField}
                            backToPrevious={::this.backToPrevious}
                            submitText='Редактировать'
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRole)
