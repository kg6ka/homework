import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import {
    ButtonLink,
    SubHeader,
    MainTable
} from '../../components';

import * as customersApi from '../../utils/endpoints/customersApi';
import * as UserActions from '../../actions/UserActions';
import * as CustomerActions from '../../actions/CustomerActions';

import Notifications, {notify} from 'react-notify-toast';
import { handleErrors } from '../../utils/handleErrors';

import StorageServiceClass from '../../utils/StorageService';

import './styles.scss';


const StorageService = new StorageServiceClass();
const notifyOptions = {
    message: '',
    type: 'custom',
    timeout: 2500,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

export class Customers extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getAllCustomers();
    }
    get userToken() {
        return this.props.user.token;
    }
    getAllCustomers() {
        this.props.customerActions.customers_request();

        customersApi
            .getAllCustomers({'Authorization': this.userToken})
            .then(handleErrors)
            .then(list => {
                this.props.customerActions.customers_success({list});
                this.setCustomerList(list);
            })
            .catch(error => {
                console.log(error);
                this.props.customerActions.customers_fail();
                notifyOptions.message = `Произошла ошибка getAllCustomers ${error.message}`;
                notifyOptions.type = 'error';
                this.showNotify(notifyOptions);
                // this.handleError({}, false);
            });
    }
    isBlockCustomer(id, action) {
        console.log(id, action);
        let queryParams = {
            user_id: id
        };
        this.props.customerActions.block_customer_request();

        customersApi
            .isBlockCustomer(
                {'Authorization': this.userToken},
                queryParams,
                action
            )
            .then(handleErrors)
            .then(() => {
                let message = action ? 'заблокирован' : 'разблокирован';
                this.props.customerActions.block_customer_success({id, action});
                this.showNotify(`Пользователь успешно ${message}`, notifyOptions.type);
            })
            .catch(error => {
                console.log(error.message);
                this.showNotify(`Произошла ошибка ${error.message}`, 'error');
                this.props.customerActions.block_customer_fail();
            });
    }

    reInviteCustomer(email) {
        this.props.customerActions.reinvite_customer_request();
        customersApi
            .reInviteCustomer(
                {'Authorization': this.userToken},
                {email}
            )
            .then(handleErrors)
            .then(() => {
                this.props.customerActions.reinvite_customer_success();
                notifyOptions.message = 'Письмо успешно отправлено';
                this.showNotify(notifyOptions);
            })
            .catch(error => {
                this.showNotify(`Произошла ошибка ${error.message}`, 'error');
                this.props.customerActions.reinvite_customer_fail();
            });
    }
    get customerList() {
        return this.props.customers.list;
    }
    get tableOptions() {
        return {
            thead: ['Имя', 'Роль', 'Email', 'Должность', 'Управление'],
            tbody: this.customerList,
            blockCustomer: ::this.isBlockCustomer,
            reInviteCustomer: ::this.reInviteCustomer
        };
    }

    setCustomerList(list) {
        StorageService.set('customerList', list);
    }

    showNotify(options) {
        notify.show(
            options.message,
            options.type,
            options.timeout,
            options.color
        );
    }
    render() {
        return (
            <seection className='role-info'>
                <SubHeader title='Управление пользователями' />
                <div className='ibox-title animated fadeInRight'>
                    <ButtonLink className='btn btn-sm btn-primary'
                                to='user-management/create'>
                        <FA name='plus' className='m-r-xs' />
                        Создать пользователя
                    </ButtonLink>
                </div>
                {this.customerList.length > 0 &&
                    <div className='clearfix animated fadeInRight'>
                        <div className='col-lg-12'>
                            <div className="ibox-content row">
                                <MainTable className='alt'
                                           options={this.tableOptions} />
                            </div>
                        </div>
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
        customers: state.customers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        customerActions: bindActionCreators(CustomerActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
