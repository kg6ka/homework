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
    timeout: 2000,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i,
    minLength: 3
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
                this.props.rolesActions.roles_success({list});
                // this.setRoleList(list);
                this.showNotify(notifyOptions);
            })
            .catch(error => {
                console.log(error.message);
                this.showNotify(notifyOptions);
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

    handleSubmit(data) {
        console.log(data);
    }

    enableButton() {
        this.setState({ canSubmit: true });
        // if ((!this.state.canSubmit || this.state.canSubmit) && this.state.value.length > 0) {
        //     this.setState({fullField: true});
        // } else {
        //     this.setState({fullField: false});
        // }
    }

    disableButton() {
        this.setState({ canSubmit: false });
        // if (this.state.canSubmit) {
        //     this.setState({fullField: false});
        // }
    }

    showNotify(options) {
        notify.show(
            options.message,
            options.type,
            options.timeout,
            options.color
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
                          onSubmit={::this.handleSubmit}
                          onValid={::this.enableButton}
                          onInvalid={::this.disableButton}
                          role='form'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='form-group row'>
                                    <div className='col-lg-6'>
                                        <label htmlFor='firstName'>Имя</label>
                                        <MyInput value={this.state.firstName}
                                             type='text'
                                             name='firstName'
                                             placeholder='Имя'
                                             validations={{
                                                 matchRegexp: /^[a-z0-9а-яё/\s]+$/i,
                                                 minLength: 2
                                             }}
                                             validationErrors={{
                                                 matchRegexp: 'Неверные формат',
                                                 minLength: 'Имя должно состоять минимум из 2 символов'
                                             }}
                                             required/>
                                    </div>
                                    <div className='col-lg-6'>
                                        <label htmlFor='lastName'>Фамилия</label>
                                        <MyInput value={this.state.lastName}
                                                 type='text'
                                                 name='lastName'
                                                 placeholder='Фамилия'
                                                 validations={{
                                                     matchRegexp: /^[a-z0-9а-яё/\s]+$/i,
                                                     minLength: 2
                                                 }}
                                                 validationErrors={{
                                                     matchRegexp: 'Неверные формат',
                                                     minLength: 'Фамилия должна состоять минимум из 2 символов'
                                                 }}
                                                 required/>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-6'>
                                        <label htmlFor='phone'>Телефон</label>
                                        <MyInput value={this.state.phone}
                                                 type='phone'
                                                 name='phone'
                                                 placeholder='Телефон'
                                                 validations={{
                                                     isInt: true,
                                                     isLength: 10
                                                 }}
                                                 validationErrors={{
                                                     isInt: 'Только цифры',
                                                     isLength: 'Телефон должен содержать 10 цифр'
                                                 }}
                                                 required/>
                                    </div>
                                    <div className='col-lg-6'>
                                        <label htmlFor='position'>Должность</label>
                                        <MyInput value={this.state.position}
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
                                    <MyInput value={this.state.email}
                                             type='text'
                                             name='userEmail'
                                             placeholder='Email'
                                             validations='isEmail'
                                             validationError='Неверный email'
                                             required/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='userPassword'>Пароль</label>
                                    <MyInput value={this.state.password}
                                             type='text'
                                             name='userPassword'
                                             placeholder='Пароль'
                                             validations={{
                                                 isAlphanumeric: true,
                                                 minLength: 6
                                             }}
                                             validationErrors={{
                                                 isAlphanumeric: 'Пароль должен содержать буквы и цыфры латинского алфавита',
                                                 minLength: 'Пароль должен содержать минимум 6 символов'
                                             }}
                                             required/>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-4 p-t-md'>
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
                                                disabled={this.state.disabledSelect}
                                                value={this.state.value}
                                                placeholder='Выберите роль'
                                                options={this.rolesList}
                                                onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className='form-group text-center'>
                                    <Button type='submit'
                                            disabled={this.state.disabledSubmit}
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
