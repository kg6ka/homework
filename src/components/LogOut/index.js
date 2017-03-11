import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import FA from 'react-fontawesome';

export class LogOut extends Component {
    handleSubmit() {
        this.props.actions.logout({
            email: null,
            password: null
        });
    }
    render() {
        const { className } = this.props;
        return (
            <button className={className}
                    type='button'
                    onClick={::this.handleSubmit}>
                <FA name='sign-out' />
            </button>
        )
    }
}

// function mapStateToProps() {
//     return {}
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(UserActions, dispatch)
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(LogOut)

export default connect(
    ({ mapStateToProps }) => ({ mapStateToProps }),
    dispatch => bindActionCreators({
        UserActions
    }, dispatch)
)(LogOut);
