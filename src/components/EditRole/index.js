import React, { Component } from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';
import * as UserActions from '../../actions/UserActions';
import * as permissionsApi from '../../utils/endpoints/permissionsApi';
import * as PermissionsAction from '../../actions/PermissionsAction';

import Notifications, {notify} from 'react-notify-toast';
import { handleErrors } from '../../utils/handleErrors';

import 'react-select/dist/react-select.css';

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i
};

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

    componentDidMount() {
        this.getAllPermissions();
        this.getCurrentPermissions();
        this.currentRoleName();
        console.log('componentWillUnmount this', this);
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
            .getAllPermissions({'Authorization': this.props.user.token})
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
            .editRole({'Authorization': this.props.user.token}, params)
            .then(handleErrors)
            .then(role => {
               console.log('edited', role);
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
            .getCurrentPermissions({'Authorization': this.props.user.token}, this.roleID)
            .then(handleErrors)
            .then(list => {
                this.props.permissionActions.current_permissions_success({list});
                return this.permissionList('currentList');
            })
            .then(list => {
                // if (this.isMounted()) {
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
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Редактирование роли
                        </h1>
                    </div>
                </header>
                {this.permissionList('list').length > 0 &&
                    <div className='clearfix holder-position'>
                        <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                              noValidate='noValidate'
                              name='editForm'
                              onSubmit={::this.handleSubmit}
                              onValid={::this.enableButton}
                              onInvalid={::this.disableButton}
                              role='form'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <label htmlFor='userEmail'>Название роли</label>
                                        <MyInput value={this.state.roleName}
                                                 type='text'
                                                 name='roleName'
                                                 placeholder='Название роли'
                                                 validations={validators}
                                                 validationError='Формат должен состоять минимум из 3 буквы и цифры'
                                                 required/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Права</label>
                                        <Select multi
                                                simpleValue
                                                disabled={this.state.disabled}
                                                value={this.state.value}
                                                placeholder='Select your favourite(s)'
                                                options={this.permissionList('list')}
                                                onChange={::this.handleSelectChange}/>
                                    </div>
                                    <div className='form-group text-center'>
                                        <Button type='submit'
                                                disabled={!this.state.fullField}
                                                bsStyle='primary'
                                                bsSize='small'>
                                            <FA name='plus m-r-xs'/>
                                            Создать
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <Button bsStyle='warning'
                                bsSize='small'
                                className='absolute-box'
                                onClick={::this.backToPrevious}>
                            <FA name='chevron-left' className='m-r-xs'/>
                            Вернуться
                        </Button>
                    </div>
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
