import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as customersApi from '../../../utils/endpoints/customersApi';
import * as rolesApi from '../../../utils/endpoints/rolesApi';
import * as RolesActions from '../../../actions/RolesActions';
import * as UserActions from '../../../actions/UserActions';
import * as CustomerActions from '../../../actions/CustomerActions';

import { handleErrors } from '../../../utils/handleErrors';
import Notifications, {notify} from 'react-notify-toast';

import {
    SubHeader,
    CustomerForm,
    Spinner
} from '../../../components';

//TODO notify global
const notifyOptions = {
    message: 'Пользователь успешно обнавлен',
    type: 'custom',
    timeout: 2000,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

export class UpdateUser extends Component {
    constructor(props) {
        super(props);
        console.log('UpdateUser', props);
        this.state = {
            canSubmit: false,
            fullField: false,
            options: [],
            value: '',
            password: '',
            email: '',
            job_title: '',
            first_name: '',
            last_name: '',
            phone: '',
            roles: []
        };
        this.userID = +this.props.params.id;
    }

    componentDidMount() {
        this.getAllRoles();
        this.currentUser();
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
            })
            .catch(error => {
                notifyOptions.message = `Произошла ошибка getAllRoles ${error.message}`;
                notifyOptions.type = 'error';
                this.showNotify(notifyOptions);
            });
    }

    get roleList() {
        const { list } = this.props.roles;
        return list.map(item => {
            item.value = item.id;
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
            return item;
        });
    }

    updateCustomer() {
        this.setState({fullField: false});
        this.props.customerActions.update_customer_request();

        customersApi
            .createCustomer({'Authorization': this.userToken})
            .then(handleErrors)
            .then(() => {
                this.props.customerActions.update_customer_success();
                this.showNotify(notifyOptions);
                this.setState({fullField: true});
            })
            .catch(error => {
                notifyOptions.message = `Произошла ошибка ${error.message}`;
                notifyOptions.type = 'error';
                this.props.customerActions.update_customer_fail();
                this.showNotify(notifyOptions);
                this.setState({fullField: true});
            });
    }

    currentUser() {
        if (this.customerList.length) {
            let user = this.customerList
                .filter(item => item.id === this.userID)[0];
            this.setState({
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                job_title: user.job_title,
                phone: user.phone
            });
        }
        return null;
    }


    handleSubmit(data) {
        console.log(data);
        // this.updateCustomer();
    }

    //TODO general checking
    handleSelectChange(value) {
        this.setState({ value });
        if (this.state.canSubmit && value) {
            this.setState({fullField: true});
        } else {
            this.setState({fullField: false});
        }
    }

    //TODO custom correct validation
    enableButton() {
        this.setState({ canSubmit: true });
        if ((!this.state.canSubmit || this.state.canSubmit) && this.state.value) {
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

    get customerList() {
        return JSON.parse(window.localStorage.getItem('customerList')) || [];
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
        browserHistory.goBack();
    }
    render() {
        return (
            <seection className='customer-info inside-notify'>
                <SubHeader title='Редактирование пользователя'/>
                <CustomerForm submitText='Обновить'
                              onSubmit={::this.handleSubmit}
                              onValid={::this.enableButton}
                              onInvalid={::this.disableButton}
                              state={this.state}
                              options={this.roleList}
                              confirm='true'
                              onChange={::this.handleSelectChange}
                              backToPrevious={::this.backToPrevious}/>
                <Notifications />
                <Spinner data-show={this.props.customers.done}/>
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
        customerActions: bindActionCreators(CustomerActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
