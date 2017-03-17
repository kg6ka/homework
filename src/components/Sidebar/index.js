import React, { Component } from 'react';

import { Navigation, UserInfo } from '../../components';

export default class Sidebar extends Component {
    render() {
        return (
            <nav className='promo-navigation navbar-default navbar-static-side'
                 role='navigation'>
                <div className='sidebar-collapse'>
                    <UserInfo user={this.props.user}/>
                    <Navigation />
                </div>
            </nav>
        )
    }
}
