import React  from 'react';

export const UserInfo = (props) => {
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