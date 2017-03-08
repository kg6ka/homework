import React, { Component } from 'react';
import FA from 'react-fontawesome';

import NavLink from '../../components/NavLink';
import NavSubLink from '../../components/NavSubLink';
import { UserInfo } from '../../components/UserInfo';

export default class Sidebar extends Component {
    render() {
        return (
            <nav className='promo-navigation navbar-default navbar-static-side' role='navigation'>
                <div className='sidebar-collapse'>
                    <ul className='nav metismenu' id='side-menu'>
                        <li className='nav-header'>
                            <UserInfo user={this.props.user}/>
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