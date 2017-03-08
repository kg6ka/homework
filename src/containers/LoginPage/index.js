import React, { Component } from 'react';
import { Spinner } from 'react-redux-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import * as UserActions from '../../actions/UserActions';
import * as userAPI from '../../utils/endpoints/userApi';

// import { Form } from 'formsy-react';
// import MyInput from '../../components/shared/MyInput';

export class LoginPage extends Component {
    //TODO
    constructor(props) {
        super(props);
        this.state = {userEmail: '', userPassword: ''};
    }
    getInitialState() {
        return { canSubmit: false };
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    componentDidMount() {
        document.body.classList.remove('gray-bg');
    }

    handleChangeEmail(event) {
        this.setState({userEmail: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({userPassword: event.target.value});
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

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.login_request();
        let currentUserBody = {
            email: this.state.userEmail,
            password: this.state.userPassword
        };
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
        return (
            <div className="loginColumns animated fadeInDown"
                 noValidate="novalidate">
                <Spinner config={{ trickleRate: 0.02, trickleSpeed: 50 }}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox-content">
                            <form className="sm-t"
                                  name="loginForm"
                                  role="form"
                                  onSubmit={::this.handleSubmit}
                                  noValidate="">
                                <div className="form-group">
                                    <input type="email"
                                           name="userEmail"
                                           className="form-control"
                                           placeholder="Email"
                                           value={this.state.userEmail}
                                           onChange={::this.handleChangeEmail}
                                           required/>
                                    {/*<MyInput value={this.state.userEmail}
                                             onChange={::this.handleChangeEmail}
                                             name="userEmail"
                                             placeholder="Email"
                                             validations="isEmail"
                                             validationError="This is not a valid email"
                                             required />*/}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           name="userPassword"
                                           className="form-control"
                                           placeholder="Password"
                                           value={this.state.userPassword}
                                           onChange={::this.handleChangePassword}
                                           required/>
                                    {/*<MyInput value={this.state.userPassword}
                                             name="userPassword"
                                             placeholder="Password"
                                             onChange={::this.handleChangePassword}
                                             type="password"
                                             required />*/}
                                </div>
                                <button type="submit"
                                        className="btn btn-primary block full-width m-b"
                                >Login</button>{/*disabled={!this.state.canSubmit}*/}
                            </form>
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
