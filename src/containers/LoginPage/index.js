import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';

export class LoginPage extends Component {
    //TODO
    // constructor() {
    //     super();
    // }
    componentDidMount() {
        document.body.classList.remove('gray-bg');
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.login({
            email: e.target.elements[0].value,
            password: e.target.elements[1].value
        });

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
                                           placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           name="userPassword"
                                           className="form-control"
                                           placeholder="Password" />
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
