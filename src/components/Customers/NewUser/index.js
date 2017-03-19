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

import { COMMON } from '../../../constants/Common';

//TODO notify global
const notifyOptions = {
    message: 'Пользователь успешно создан',
    type: 'custom',
    timeout: 2000,
    color: {
        background: '#18a689',
        text: '#fff'
    }
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

    createCustomer(params) {
        this.setState({fullField: false});
        this.props.customerActions.create_customer_request();
        customersApi
            .createCustomer({'Authorization': this.userToken}, params)
            .then(handleErrors)
            .then(() => {
                this.props.customerActions.create_customer_success();
                this.showNotify(notifyOptions);

                setTimeout(() => {
                    this.setState({fullField: true});
                    this.backToPrevious();
                }, COMMON.PAGE_CHANGE_DELAY);
            })
            .catch(error => {
                notifyOptions.message = `Произошла ошибка ${error.message}`;
                notifyOptions.type = 'error';
                this.props.customerActions.create_customer_fail();
                this.showNotify(notifyOptions);
                this.setState({fullField: true});
            });
    }

    handleSubmit(data) {
        data.role_id = this.state.value;
        this.createCustomer(data);
    }

    //TODO extend checking
    handleSelectChange(value) {
        this.setState({ value });
        if (this.state.canSubmit && value) {
            this.setState({fullField: true});
        } else {
            this.setState({fullField: false});
        }
    }


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
                <SubHeader title='Создание пользователя'/>
                <CustomerForm submitText='Создать'
                              onSubmit={::this.handleSubmit}
                              onValid={::this.enableButton}
                              onInvalid={::this.disableButton}
                              state={this.state}
                              options={this.roleList}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
