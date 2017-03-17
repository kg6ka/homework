import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { Form } from 'formsy-react';
import MyInput from '../../../components/shared/MyInput';

// import * as customersApi from '../../../utils/endpoints/customersApi';
import * as rolesApi from '../../../utils/endpoints/rolesApi';
import * as RolesActions from '../../../actions/RolesActions';
import * as UserActions from '../../../actions/UserActions';
import * as CustomerActions from '../../../actions/CustomerActions';

import { handleErrors } from '../../../utils/handleErrors';
import Notifications, {notify} from 'react-notify-toast';

import { ButtonLink, SubHeader } from '../../../components';

const notifyOptions = {
    message: 'Пользователь успешно создан',
    type: 'custom',
    timeout: 1500,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i
};

export class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            fullField: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            position: '',
            options: [],
            value: '',
            roles: []
        };
    }

    componentDidMount() {
        this.getAllRoles();
    }

    get userToken() {
        return this.props.user.token;
    }

    getAllRoles() {
        this.props.rolesActions.roles_request();

        rolesApi
            .getAllRoles({'Authorization': this.userToken})
            .then(handleErrors)
            .then(list => {
                this.props.rolesActions.roles_success({list: list});
                // this.setRoleList(list);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    get rolesList() {
        const { list } = this.props.roles;
        return list.map(item => {
            item.value = item.name.toLowerCase();
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
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
        browserHistory.push('/user-management');
    }
    render() {
        return (
            <seection className='customer-info inside-notify'>
                <SubHeader title='Создание пользователя'/>
                <div className='clearfix holder-position form-holder'>
                    <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                          noValidate='noValidate'
                          name='editForm'
                          onSubmit={this.props.onSubmit}
                          onValid={this.props.onValid}
                          onInvalid={this.props.onInvalid}
                          role='form'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='form-group row'>
                                    <div className='col-lg-6'>
                                        <label htmlFor='firstName'>Имя</label>
                                        <MyInput value={this.props.firstName}
                                             type='text'
                                             name='firstName'
                                             placeholder='Имя'
                                             validations={validators}
                                             validationError='Формат не корректен'
                                             required/>
                                    </div>
                                    <div className='col-lg-6'>
                                        <label htmlFor='lastName'>Фамилия</label>
                                        <MyInput value={this.props.lastName}
                                                 type='text'
                                                 name='lastName'
                                                 placeholder='Фамилия'
                                                 validations={validators}
                                                 validationError='Формат не корректен'
                                                 required/>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-6'>
                                        <label htmlFor='phone'>Телефон</label>
                                        <MyInput value={this.props.phone}
                                                 type='phone'
                                                 name='phone'
                                                 placeholder='Телефон'
                                                 validations={validators}
                                                 validationError='Формат не корректен'
                                                 required/>
                                    </div>
                                    <div className='col-lg-6'>
                                        <label htmlFor='position'>Должность</label>
                                        <MyInput value={this.props.position}
                                                 type='text'
                                                 name='position'
                                                 placeholder='Должность'
                                                 validations={validators}
                                                 validationError='Формат не корректен'
                                                 required/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='userEmail'>Email</label>
                                    <MyInput value={this.props.email}
                                             type='text'
                                             name='userEmail'
                                             placeholder='Email'
                                             validations='isEmail'
                                             validationError='Формат не корректен'
                                             required/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='userPassword'>Пароль</label>
                                    <MyInput value={this.props.password}
                                             type='text'
                                             name='userPassword'
                                             placeholder='Пароль'
                                             validations={validators}
                                             validationError='Некорректный формат'
                                             required/>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-4'>
                                        <ButtonLink className='btn btn-sm btn-success'
                                                    to='role-management/create'>
                                            <FA name='plus' className='m-r-xs' />
                                            Создать роль
                                        </ButtonLink>
                                    </div>
                                    <div className='col-lg-8'>
                                        <label>Роли</label>
                                        <Select multi
                                                simpleValue
                                                disabled={this.props.disabledSelect}
                                                value={this.props.value}
                                                placeholder='Выберите роль'
                                                options={this.rolesList}
                                                onChange={this.props.onChange}/>
                                    </div>
                                </div>
                                <div className='form-group text-center'>
                                    <Button type='submit'
                                            disabled={this.props.disabledSubmit}
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
                <Notifications />
            </seection>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        roles: state.roles,
        customers: state.customers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
        rolesActions: bindActionCreators(RolesActions, dispatch),
        customersActions: bindActionCreators(CustomerActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
