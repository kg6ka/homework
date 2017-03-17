import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import FA from 'react-fontawesome';
import {
    ButtonLink,
    SubHeader
} from '../../components';

import * as UserActions from '../../actions/UserActions';
import * as CustomerActions from '../../actions/CustomerActions';

export class Customers extends Component {
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
