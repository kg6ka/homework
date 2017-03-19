import React from 'react';

import './styles.scss';

export default (props) => {
    return (
        <div {...props} className={'sk-holder' + ' ' + (props['data-show'] ? 'active' : '')}>
            <div  className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    );
}
