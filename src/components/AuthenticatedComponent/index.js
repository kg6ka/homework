import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/UserActions';
// import { ROUTING } from '../../../constants/Routing'

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            // console.log('requireAuthentication', this.props);
            this.checkAuth()
        }

        checkAuth() {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log('checkAuth', this.props.user);
            if (user && user.isAuthenticated) {
                if (!this.props.user.token) {
                    this.props.actions.login_success(user);
                }
            } else {
                browserHistory.push('/login');
            }
        }

        render() {
            return (
                <div>
                    {this.props.user.isAuthenticated === true
                        ? <Component {...this.props} />
                        : null
                    }
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

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}