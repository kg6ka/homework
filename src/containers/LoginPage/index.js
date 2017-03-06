import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
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

    handleSubmit(event) {
        event.preventDefault();

        this.fetchOpt.body = JSON.stringify({email: this.state.userEmail, password: this.state.userPassword});
        //TODO add seccuse and fail logic
        fetch(this.loginUrl, this.fetchOpt)
            .then(res => { console.log(res); })
            .catch(error => { console.log(error) });

        // e.preventDefault();
        // this.props.actions.login({
        //     email: e.target.elements[0].value,
        //     password: e.target.elements[1].value
        // });

        /*const login = e.target.elements[0].value;
         window.localStorage.setItem('rr_login', login);

         if (login === 'admin') {
         this.context.router.push('/admin')
         } else {
         this.context.router.push('/')
         }*/
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

/*LoginPage.contextTypes = {
 router: PropTypes.object.isRequired
 };*/

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
