import React  from 'react';

import LogOut from '../LogOut';

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
                <LogOut className='btn btn-primary pull-right'/>
            </nav>
        </div>
    )
};
