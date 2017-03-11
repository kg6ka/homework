import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/UserActions';
// import { ROUTING } from '../../../constants/Routing'

export default function loginWrap(Component) {

    class LoginWrap extends React.Component {
        componentWillMount() {
            this.checkAuth()
        }

        checkAuth() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user && user.isAuthenticated) {
                browserHistory.push('/');
            }
        }

        render() {
            return (
                <div>
                    {!this.props.user.isAuthenticated
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

    return connect(mapStateToProps, mapDispatchToProps)(LoginWrap)
}