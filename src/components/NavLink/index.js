import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './styles.scss';

export default class NavLink extends Component {
    get currentPath() {
        const currentLocation = this.context.router.getCurrentLocation();
        return currentLocation.pathname.slice(1).split('/').shift();
    }
    get toPath() {
        return this.props.to.slice(1);
    }
    render() {
        console.log(this.currentPath, this.toPath);
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive || this.currentPath === this.toPath ? 'active' : '',
            isActiveParent = this.currentPath === this.toPath ? 'active-parent' : '';

        return (
            <li className={`nav-link ${className} ${isActiveParent}`}>
                <Link {...this.props} activeClassName='active'/>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object.isRequired
};
