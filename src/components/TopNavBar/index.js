import React  from 'react';

import LogOut from '../LogOut';

export default () => {
    return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top white-bg"
                 role="navigation">
                <div className="navbar-header">
                    <span>My basket</span>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <LogOut />
                    </li>
                </ul>
            </nav>
        </div>
    )
};
