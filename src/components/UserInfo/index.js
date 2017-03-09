import React  from 'react';

export default (props) => {
    return (
        <article className='user-info'>
            <div className='profile-element'>
                <strong className='font-bold'>{props.user.email}</strong>
            </div>
            <div className='logo-element'>
                RGAND
            </div>
        </article>
    )
};