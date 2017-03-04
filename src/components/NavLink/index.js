import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './styles.scss';

export default class NavLink extends Component {
    render() {
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? 'active' : '';

        return (
            <li className={className}>
                <Link {...this.props} activeClassName='active'/>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object.isRequired
};
