import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import FA from 'react-fontawesome';

import { NavLink } from '../../components';
// import { Accordion, Panel } from 'react-bootstrap';
const { string, object } = PropTypes;

export default class NavSubLink extends Component {
    render() {
        console.log(this.props.children);
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? 'active' : '',
            collapseIsActive = className ? 'in' : '',
            collapseClasses = `nav nav-second-level collapse ${collapseIsActive}`;

        //TODO accordion
        return (
                <li className={`nav-link ${className} `}>
                    {/*<Link {...this.props} activeClassName='active'/>*/}
                    <a>
                        <FA className="icon" name='list' />
                        Каталог всех товаров
                    </a>
                    <ul className={collapseClasses}>
                        <NavLink to='/catalogs/sub1'>
                            Sub catalog 1
                        </NavLink>
                        <NavLink to='/catalogs/sub2'>
                            Sub catalog 2
                        </NavLink>
                        <NavLink to='/catalogs/sub3'>
                            Sub catalog 3
                        </NavLink>
                    </ul>
                </li>
                /*<Accordion>
                    <Panel header="Recommended Assignments" eventKey='1'>
                    Some Info here
                        <Accordion>
                            <Panel header="Recommended Assignments one" eventKey='3'>
                                Some Info here
                            </Panel>
                            <Panel header="Recommended Assignments two" eventKey='4'>
                                Some Info here
                            </Panel>
                        </Accordion>
                    </Panel>
                    <Panel header="Candidate Information" eventKey='2'>
                        More Info here
                    </Panel>
                    <Panel header="Contact Information" eventKey={open}>
                        Yet another Panel
                    </Panel>
                </Accordion>*/
        );
    }
}

NavSubLink.contextTypes = {
    router: object.isRequired,
    to: string
};
