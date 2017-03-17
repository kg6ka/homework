import React  from 'react';
import FA from 'react-fontawesome';
import { NavLink, NavSubLink } from '../../components';
import { NAVIGATION_OPTIONS } from '../../constants/Navigation';

export default () => {
    let navItem = null;
    const navList = NAVIGATION_OPTIONS.map(item => {
        if (!item.sidebar) {
            navItem = (
                <NavLink onlyActiveOnIndex={item.activeOnIndex}
                         key={item.title}
                         to={item.toPath}>
                    <FA className="icon"
                        name={item.icon} />
                    {item.title}
                </NavLink>
            );
        } else {
            navItem = (
                <NavSubLink key={item.title}
                            to={item.toPath}>
                    <FA className="icon"
                        name={item.icon} />
                    {item.title}
                </NavSubLink>
            );
        }
        return navItem;
    });
    return (
        <ul className='nav metismenu'
            id='side-menu'>
            {navList}
        </ul>
    );
}
