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

const FLAVOURS = [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Caramel', value: 'caramel' },
    { label: 'Cookies and Cream', value: 'cookiescream' },
    { label: 'Peppermint', value: 'peppermint' }
];

const validators = {
    matchRegexp: /^[a-z0-9а-яё]+$/i
};

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
            value: ''
        };
    }

    componentDidMount() {
        this.setState({ options: FLAVOURS });
        // this.getAllPermissions();
    }

    getAllPermissions() {
        this.props.permissionActions.roles_request();
        permissionsApi
            .getAllPermissions({'Authorization': this.props.user.token})
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
            });
    }

    createRole(data) {
        console.log(data);
        this.props.rolesActions.roles_request();
        // rolesApi
        //     .createRole({'Authorization': this.props.user.token}, params)
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
        this.createRole(data);
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

    // toggleDisabled (e) {
    //     this.setState({ disabled: e.target.checked });
    // }

    backToPrevious() {
        browserHistory.push('/role-management');
    }

    render() {
        // const disable = !this.state.canSubmit && !this.state.value;
        return (
            <seection className='role-info'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Создание роли
                        </h1>
                    </div>
                </header>
                <div className='clearfix holder-position'>
                    <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                          noValidate='noValidate'
                          name='loginForm'
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
                                             required />
                                </div>
                                <div className='form-group'>
                                    <label>Права</label>
                                    <Select multi
                                            simpleValue
                                            disabled={this.state.disabled}
                                            value={this.state.value}
                                            placeholder='Select your favourite(s)'
                                            options={this.state.options}
                                            onChange={::this.handleSelectChange} />
                                </div>
                                <div className='form-group text-center'>
                                    <Button type='submit'
                                            disabled={!this.state.fullField}
                                            bsStyle='primary'
                                            bsSize='small'>
                                        <FA name='plus m-r-xs' />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole)
