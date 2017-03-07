import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions/index';
console.log(UserActions)
import * as ApiUrl from '../../constants/Routes';

export class LoginPage extends Component {
    //TODO
    constructor(props) {
        super(props);
        this.state = {userEmail: '', userPassword: ''};

        this.requestHeader = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })

        this.fetchOpt = {
            method: 'POST',
            headers: this.requestHeader,
            mode: 'cors'
        }

        this.loginUrl = ApiUrl.ROOT_API + ApiUrl.LOGIN_API;
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
        } else {
            user.email = this.state.userEmail;
            user.isAuthenticated = false;
            user.token = '';
            user.user_id = '';
            user.expired = 0;
            this.props.actions.login_fail(user);
        }
        this.state.userEmail = '';
        this.state.userPassword = '';
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.login_request();
        this.fetchOpt.body = JSON.stringify({email: this.state.userEmail, password: this.state.userPassword});
        //TODO  add expired data
        fetch(this.loginUrl, this.fetchOpt)
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="ibox-content">
                            <form className="sm-t"
                                  name="loginForm"
                                  role="form"
                                  onSubmit={::this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           name="userEmail"
                                           className="form-control"
                                           placeholder="Email"
                                           value={this.state.userEmail}
                                           onChange={::this.handleChangeEmail} />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           name="userPassword"
                                           className="form-control"
                                           placeholder="Password"
                                           value={this.state.userPassword}
                                           onChange={::this.handleChangePassword}/>
                                </div>
                                <button type="submit"
                                        className="btn btn-primary block full-width m-b"
                                >Login</button>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
