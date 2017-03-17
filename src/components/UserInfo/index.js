import React  from 'react';

import './styles.scss';

export default (props) => {
    return (
        <article className='nav-header user-info'>
            <div className='profile-element'>
                <strong className='font-bold'>{props.user.email}</strong>
            </div>
            <div className='logo-element'>
                RGAND
            </div>
        </article>
    )
};