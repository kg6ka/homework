import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FA from 'react-fontawesome';
import {
    ButtonLink,
    SubHeader
} from '../../components';

import * as customersApi from '../../utils/endpoints/customersApi';
import * as UserActions from '../../actions/UserActions';
import * as CustomerActions from '../../actions/CustomerActions';

import { handleErrors } from '../../utils/handleErrors';

export class Customers extends Component {
    componentDidMount() {
        this.getAllCustomers();
    }
    get userToken() {
        return this.props.user.token;
    }
    getAllCustomers() {
        let self = this;
        self.props.customerActions.customers_request();

        customersApi
            .getAllCustomers({'Authorization': self.userToken})
            .then(handleErrors)
            .then(customers => {
                console.log('getAllCustomers', customers);
                self.props.customerActions.customers_success({customers});
            })
            .catch(error => {
                console.log(error.message);
                self.props.customerActions.customers_fail();
                // this.handleError({}, false);
            });
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
