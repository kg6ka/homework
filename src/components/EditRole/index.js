import React, { Component } from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as rolesApi from '../../utils/endpoints/rolesApi';
import * as RolesActions from '../../actions/RolesActions';
import * as permissionsApi from '../../utils/endpoints/permissionsApi';
import * as PermissionsAction from '../../actions/PermissionsAction';

import 'react-select/dist/react-select.css';

/*const FLAVOURS = [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Caramel', value: 'caramel' }
];*/

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i
};

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
        this.roleID = this.props.params.id;
    }

    componentDidMount() {
        this.getAllPermissions();
        this.getCurrentPermissions();
        setTimeout(() => {
            // const roleName = this.props.roles.currentRole.name;
            // this.setState({ value: FLAVOURS });
            // this.setState({ roleName });
        }, 800)
    }

    getAllPermissions() {
        this.props.permissionActions.permissions_request();
        permissionsApi
            .getAllPermissions({'Authorization': this.props.user.token})
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(list => {
                this.props.permissionActions.permissions_success({list});
            })
            .catch(error => {
                console.log(error.message);
                //TODO handle error global
                // this.handleError({}, false);
            });
    }

    editRole(data) {
        console.log(data);
        this.props.rolesActions.roles_request();
        // rolesApi
        //     .editRole({'Authorization': this.props.user.token}, params)
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

    getRole(param) {
        this.props.rolesActions.roles_request();
        console.log(param);
        /*rolesApi
            .getRole({'Authorization': this.props.user.token}, param)
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

    getCurrentPermissions() {
        this.props.permissionActions.current_permissions_request();
        permissionsApi
            .getCurrentPermissions({'Authorization': this.props.user.token}, this.roleID)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(list => {
                this.props.permissionActions.current_permissions_success({list});
                return this.currentPermissionList;
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
        console.log('You\'ve selected:', value);
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
        console.log('permissionsName', this.permissionsName);
        console.log('selectedPermissionsName', this.selectedPermissionsName);
        console.log('differentPermission', this.differentPermission);
        // this.editRole(data);
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

    get permissionList() {
        const { list } = this.props.permissions;
        return list.map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    get currentPermissionList() {
        const { currentList } = this.props.permissions;
        return currentList.map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    //TODO permissionIDs
    get permissionsName() {
        let self = this;
        return self.currentPermissionList.reduce((initialState, item) => {
            if (self.defaultPermissionsName.indexOf(item.name) !== -1) {
                initialState.push(item.id);
            }
            return initialState;
        }, []);
    }

    get defaultPermissionsName() {
        return this.currentPermissionList.map(item => {
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

    get differentPermission() {
        let self = this;
        for (let i = 0; i < self.defaultPermissionsName; i++) {
            for (let j = 0; j < self.selectedPermissionsName; j++) {
                if (self.selectedPermissionsName[j] === self.defaultPermissionsName[i]) {
                    console.log(self.selectedPermissionsName[j], self.defaultPermissionsName[i]);
                }
            }
        }
        /*if (self.selectedPermissionsName.length >= self.defaultPermissionsName.length) {
            return self.selectedPermissionsName.map(item => {
                if (self.defaultPermissionsName.indexOf(item) === -1) {
                    return item;
                }
            });
        } else {
            return self.defaultPermissionsName.map(item => {
                if (self.selectedPermissionsName.indexOf(item) === -1) {
                    return item;
                }
            });
        }*/

    }

    backToPrevious() {
        browserHistory.push('/role-management');
    }

    render() {
        return (
            <seection className='role-info'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Редактирование роли
                        </h1>
                    </div>
                </header>
                {this.permissionList.length > 0 &&
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
                                                options={this.permissionList}
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
            </seection>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.roles,
        permissions: state.permissions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        rolesActions: bindActionCreators(RolesActions, dispatch),
        permissionActions: bindActionCreators(PermissionsAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRole)
