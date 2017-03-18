import React, { Component } from 'react';
import { Spinner } from 'react-redux-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import * as UserActions from '../../actions/UserActions';
import * as userAPI from '../../utils/endpoints/userApi'
import { LocalizationChangeComponent } from '../../components';
console.log(LocalizationChangeComponent)
import Notifications, {notify} from 'react-notify-toast';
import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

import { Button } from 'react-bootstrap';
import { handleErrors } from '../../utils/handleErrors';

const notifyOptions = {
    message: 'Добро пожаловать',
    type: 'custom',
    timeout: 3000,
    color: {
        background: '#18a689',
        text: '#fff'
    }
};

const minLength = 4;
const emailValidations = {
    isEmail: true,
    maxLength: 100
};
const passValidations = { minLength };

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
        document.body.classList.remove('gray-bg');
        //TODO change to prop after route fix
        if (!(user && user.isAuthenticated)) {
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
            this.props.userActions.login_success(user);
            localStorage.setItem('user', JSON.stringify(user));
            browserHistory.push('/')
        } else {
            user.email = this.state.userEmail;
            user.isAuthenticated = false;
            user.token = '';
            user.user_id = '';
            user.expired = 0;
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
        return (
            <div className="loginColumns animated fadeInDown">
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
                <Spinner config={{ trickleRate: 0.02, trickleSpeed: 50 }}/>
                <Notifications />
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
        userActions: bindActionCreators(UserActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
