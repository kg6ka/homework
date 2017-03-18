import React  from 'react';

import LogOut from '../LogOut';
import LocalizationChangeComponent from '../LocalizationChange';

export default () => {
    return (
        <div className='row border-bottom'>
            <nav className='navbar navbar-static-top white-bg'
                 role='navigation'>
                <div className='navbar-header'>
                    <input type='text'
                           name='searchBar'
                           className='form-control'
                           placeholder='Поиск'
                           required/>
                </div>
                <LocalizationChangeComponent className='btn btn-primary btn-s' />
                <LogOut className='btn btn-primary pull-right'/>
            </nav>
        </div>
    )
};
