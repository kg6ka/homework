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
                            Главная
                        </NavLink>
                        <NavLink to='/role-management'>
                            <FA className="icon" name='home' />
                            Управление ролями
                        </NavLink>
                        <NavLink to='/user-management'>
                            <FA className="icon" name='home' />
                            Управление пользователями
                        </NavLink>
                        <NavLink to='/my-catalogs'>
                            <FA className="icon" name='list-alt' />
                            Мои товары
                        </NavLink>
                        <NavSubLink to='/catalogs'>
                            <FA className="icon" name='list' />
                            Каталог всех товаров
                        </NavSubLink>
                        <NavLink to='/goods-audit'>
                            <FA className="icon" name='home' />
                            Аудит товар
                        </NavLink>
                        <NavLink to='/my-selling'>
                            <FA className="icon" name='home' />
                            Мои продажи
                        </NavLink>
                        <NavLink to='/partition-management'>
                            <FA className="icon" name='home' />
                            Управление разделами
                        </NavLink>
                        <NavLink to='/partition-shares'>
                            Управление акциями
                        </NavLink>
                    </ul>
                </div>
            </nav>
        )
    }
}