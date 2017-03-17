import React  from 'react';

export default (props) => {
    return (
        <header className='sub-header row white-bg'>
            <div className='col-lg-12'>
                <h1 className='title'>
                    {props.title}
                </h1>
            </div>
        </header>
    )
};
