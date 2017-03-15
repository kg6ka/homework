import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { ROUTING } from '../../../constants/Routing'

export default function requirePermissions(Component, permissions) {

    class PermissionsComponent extends React.Component {
        componentWillMount() {
            // console.log('requireAuthentication', this.props);
            this.checkPermissions()
        }

        checkPermissions() {
            if(this.props.user.permissions !== permissions) {
                browserHistory.push('/');
            }
        }

        render() {
            return (
                <Component {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    };

    return connect(mapStateToProps)(PermissionsComponent)
}