import React, { Component } from 'react';
import FA from 'react-fontawesome';

import { NavLink, NavSubLink, UserInfo } from '../../components';

const navigationOptions = [
    {
        toPath: '/',
        activeOnIndex: true,
        icon: 'home',
        title: 'Главная'
    }, {
        toPath: 'role-management',
        icon: 'home',
        title: 'Управление ролями'
    }, {
        toPath: 'user-management',
        icon: 'home',
        title: 'Управление пользователями'
    }, {
        toPath: 'my-catalogs',
        icon: 'list-alt',
        title: 'Мои товары'
    }, {
        toPath: 'catalogs',
        sidebar: true,
        icon: 'list',
        title: 'Каталог всех товаров'
    }, {
        toPath: 'goods-audit',
        icon: 'home',
        title: 'Аудит товар'
    }, {
        toPath: 'my-selling',
        icon: 'home',
        title: 'Мои продажи'
    }, {
        toPath: 'partition-management',
        icon: 'home',
        title: 'Управление разделами'
    }, {
        toPath: 'partition-shares',
        icon: 'home',
        title: 'Управление акциями'
    }
];

export default class Sidebar extends Component {
    //TODO user info, separate navigate
    render() {
        let navItem = null;
        const navList = navigationOptions.map(item => {
            if (!item.sidebar) {
                navItem = (
                  <NavLink onlyActiveOnIndex={item.activeOnIndex} key={item.title} to={item.toPath}>
                      <FA className="icon" name={item.icon} />
                      {item.title}
                  </NavLink>
                );
            } else {
                navItem = (
                    <NavSubLink key={item.title} to={item.toPath}>
                        <FA className="icon" name={item.icon} />
                        {item.title}
                    </NavSubLink>
                );
            }
            return navItem;
        });
        return (
            <nav className='promo-navigation navbar-default navbar-static-side' role='navigation'>
                <div className='sidebar-collapse'>
                    <ul className='nav metismenu' id='side-menu'>
                        <li className='nav-header'>
                            <UserInfo user={this.props.user}/>
                        </li>
                        {navList}
                    </ul>
                </div>
            </nav>
        )
    }
}