import React, { Component } from 'react';
import { Spinner } from 'react-redux-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import * as UserActions from '../../actions/UserActions';

import * as userAPI from '../../utils/endpoints/userApi'
import * as inviteApi from '../../utils/endpoints/checkInviteApi'
import { getParams } from '../../utils/endpoints/getUrlParams';

import { LocalizationChangeComponent } from '../../components';
import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

import { Button } from 'react-bootstrap';
import { handleErrors } from '../../utils/handleErrors';

import has from 'lodash/has';

const emailValidations = {
    isEmail: true,
    maxLength: 100
};
const passValidations = { minLength: 4 };

export class LoginPage extends Component {
    //TODO
    constructor(props) {
      super(props);
      document.body.classList.remove('gray-bg');

      this.state = {
        userEmail: '',
        userPassword: '',
        canSubmit: false
      };
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    componentWillMount() {
          if(getParams('options', window.location.search) === 'InviteActivate'){
            inviteApi.checkInvite(getParams('hash', window.location.search))
          }
    }

    handleChangeEmail(email) {
        this.setState({userEmail: email});
    }

    handleChangePassword(pass) {
        this.setState({userPassword: pass});
    }

    handleLogin(user, success) {
        if (success) {
            let permissions = {};
            user.permissions.forEach((perm) => {
                permissions[perm] = perm;
            });
            user.permissions = permissions;
            user.email = this.state.userEmail;
            user.isAuthenticated = true;
            this.props.userActions.login_success(user);
            localStorage.setItem('user', JSON.stringify(user));
            browserHistory.push('/')
        } else {
            user.email = this.state.userEmail;
            user.isAuthenticated = false;
            user.token = '';
            user.user_id = '';
            user.expired = 0;
            user.permissions = {};
            this.props.userActions.login_fail(user);
            this.setState({userEmail: '', userPassword: ''});
        }
    }

    handleSubmit(data) {
        if (!this.state.canSubmit) {
            return;
        }

        this.props.userActions.login_request();

        let currentUserBody = {
            email: data.userEmail,
            password: data.userPassword
        };
        this.handleChangeEmail(data.userEmail);
        this.handleChangePassword(data.userPassword);
        //TODO  add expired data
        userAPI.getCurrentUser(currentUserBody)
            .then(handleErrors)
            .then(user => {
                this.handleLogin(user, true);
            })
            .catch(error => {
                console.log(error.message);
                this.handleLogin({}, false);
            });
    }
    render() {
        const hasLocalization = has(this.props.localization, 'LANGUAGE');

        return (
            <div className="loginColumns animated fadeInDown">
              {hasLocalization && (
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox-content">
                            <h2 className='text-center'>RGAND</h2>
                            <Form className="sm-t"
                                  name="loginForm"
                                  role="form"
                                  onSubmit={::this.handleSubmit}
                                  onValid={::this.enableButton}
                                  onInvalid={::this.disableButton}
                                  noValidate="">
                                <div className="form-group">
                                    <MyInput value={this.state.userEmail}
                                             name="userEmail"
                                             placeholder="Email"
                                             validations={emailValidations}
                                             validationError={this.props.localization.LOGIN.emailValidationError}
                                             required />
                                </div>
                                <div className="form-group">
                                    <MyInput value={this.state.userPassword}
                                             name="userPassword"
                                             placeholder="Password"
                                             validations={passValidations}
                                             validationError={this.props.localization.LOGIN.passwordValidationError}
                                             type="password"
                                             required />
                                </div>
                                <Button type='submit'
                                        disabled={!this.state.canSubmit}
                                        className='block full-width m-b'
                                        bsStyle='primary'
                                        bsSize='small'
                                >Login</Button>
                            </Form>
                            <LocalizationChangeComponent className='btn btn-primary btn-xs' />
                        </div>
                    </div>
                </div>
              )}
            <Spinner config={{ trickleRate: 0.02, trickleSpeed: 50 }}/>
            </div>
          )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        localization: state.localization
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
