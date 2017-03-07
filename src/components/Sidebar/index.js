import React, { Component } from 'react';
import FA from 'react-fontawesome';

import NavLink from '../../components/NavLink';
import NavSubLink from '../../components/NavSubLink';

export default class Sidebar extends Component {
    componentWillMount() {

    }
    render() {
        return (
            <nav className='promo-navigation navbar-default navbar-static-side' role='navigation'>
                <div className='sidebar-collapse'>
                    <ul data-side-navigation className='nav metismenu' id='side-menu'>
                        <li className='nav-header'>
                            <div className='dropdown profile-element' data-dropdown>
                                {/*<img className='img-circle'  width='70px' height='70px' src='{{profile.avatar.default}}' />*/}
                                {/*<img className='img-circle' width='65px' height='65px' src='{{profile.avatar.small}}' />*/}
                                <a className='dropdown-toggle' data-dropdown-toggle>
                                    <span className='clear'>
                                        <span className='block m-t-xs'>
                                            <strong className='font-bold'>User email</strong>
                                        </span>
                                    </span>
                                </a>
                            </div>
                            <div className='logo-element'>
                                AppName
                            </div>
                        </li>
                        <NavLink onlyActiveOnIndex={true} to='/'>
                            <FA className="icon" name='home' />
                            Home
                        </NavLink>
                        <NavSubLink to='/catalogs'>
                            <FA className="icon" name='list' />
                            Catalog
                        </NavSubLink>
                        <NavLink to='/mycatalogs'>
                            <FA className="icon" name='list-alt' />
                            My Catalog
                        </NavLink>
                    </ul>
                </div>
            </nav>
        )
    }
}