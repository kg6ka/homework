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
                // handleError({}, false);
            });
    }

    createRole(params) {
        this.setState({fullField: false});
        this.props.rolesActions.create_role_request();

        rolesApi
            .createRole({'Authorization': this.props.user.token}, params)
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
        return this.permssionList.reduce((initialState, item) => {
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

    get permssionList() {
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
                {this.permssionList.length > 0 &&
                    <div className='clearfix holder-position'>
                        <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                              noValidate='noValidate'
                              name='createForm'
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
                                                placeholder='Пожалуйста выберите роль(и)'
                                                options={this.permssionList}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole)
