import React, { Component } from 'react';
import { Spinner } from 'react-redux-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import * as UserActions from '../../actions/UserActions';
import * as userAPI from '../../utils/endpoints/userApi';

import Notifications, {notify} from 'react-notify-toast';
import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

export class LoginPage extends Component {
    //TODO
    constructor(props) {
        super(props);
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

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        const notifyOptions = {
            message: 'Добро пожаловать',
            type: 'custom',
            timeout: 3000,
            color: {
                background: '#18a689',
                text: '#fff'
            }
        };
        document.body.classList.remove('gray-bg');
        //TODO change to prop after route fix
        if (!user.isAuthenticated) {
            notify.show(
                notifyOptions.message,
                notifyOptions.type,
                notifyOptions.timeout,
                notifyOptions.color
            );
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
            user.email = this.state.userEmail;
            user.isAuthenticated = true;
            this.props.actions.login_success(user);
            localStorage.setItem('user', JSON.stringify(user));
            browserHistory.push('/')
        } else {
            user.email = this.state.userEmail;
            user.isAuthenticated = false;
            user.token = '';
            user.user_id = '';
            user.expired = 0;
            this.props.actions.login_fail(user);
            this.setState({userEmail: '', userPassword: ''});
        }
    }

    handleSubmit(data) {
        if (!this.state.canSubmit) {
            return;
        }

        this.props.actions.login_request();

        let currentUserBody = {
            email: data.userEmail,
            password: data.userPassword
        };
        this.handleChangeEmail(data.userEmail);
        this.handleChangePassword(data.userPassword);
        //TODO  add expired data
        userAPI.getCurrentUser(currentUserBody)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(user => {
                this.handleLogin(user, true);
            })
            .catch(error => {
                console.log(error.message);
                this.handleLogin({}, false);
            });
    }
    render() {
        const minLength = 4;
        const emailValidations = {
            isEmail: true,
            maxLength: 100
        };
        const passValidations = { minLength };
        return (
            <div className="loginColumns animated fadeInDown">
                <Notifications />
                <Spinner config={{ trickleRate: 0.02, trickleSpeed: 50 }}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox-content">
                            <Form className="sm-t"
                                  name="loginForm"
                                  role="form"
                                  onSubmit={::this.handleSubmit}
                                  onValid={::this.enableButton}
                                  onInvalid={::this.disableButton}
                                  noValidate="">
                                <div className="form-group">
                                    {/*<input type="email"
                                           name="userEmail"
                                           className="form-control"
                                           placeholder="Email"
                                           value={this.state.userEmail}
                                           onChange={::this.handleChangeEmail}
                                           required/>*/}
                                    <MyInput value={this.state.userEmail}
                                             name="userEmail"
                                             placeholder="Email"
                                             validations={emailValidations}
                                             validationError='Не корректный емейл'
                                             required />
                                </div>
                                <div className="form-group">
                                    {/*<input type="password"
                                           name="userPassword"
                                           className="form-control"
                                           placeholder="Password"
                                           value={this.state.userPassword}
                                           onChange={::this.handleChangePassword}
                                           required/>*/}
                                    <MyInput value={this.state.userPassword}
                                             name="userPassword"
                                             placeholder="Password"
                                             validations={passValidations}
                                             validationError={`Пароль должен состоять минимум из ${minLength} символов`}
                                             type="password"
                                             required />
                                </div>
                                <button type="submit"
                                        disabled={!this.state.canSubmit}
                                        className="btn btn-primary block full-width m-b"
                                >Login</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
