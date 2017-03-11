import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import FA from 'react-fontawesome';

class LogOut extends Component {
    handleSubmit() {
        localStorage.removeItem('user');
        this.props.actions.logout_success();
        browserHistory.push('/login');
    }
    render() {
        return (
            <button type="button"
                    className="btn btn-primary"
                    onClick={::this.handleSubmit}>
                <FA name='sign-out' />
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)

// export default connect(
//     ({ mapStateToProps }) => ({ mapStateToProps }),
//     dispatch => bindActionCreators({
//         UserActions
//     }, dispatch)
// )(LogOut);
