import React, { Component } from 'react';
// import jQuery from 'jquery';

//Custom components
import Sidebar from '../../components/Sidebar';
import { TopNavBar } from '../../components/TopNavBar';
import DOMManipulation from '../../utils/DOMManipulation';

export default class MainApp extends Component {
    componentDidMount() {
        document.body.className = 'gray-bg pace-done';
        DOMManipulation.minHeightApp();
        window.addEventListener('orientationchange', () => {
            console.log('componentDidMount');
        });
        DOMManipulation.addEventListener('resize', () => {
            console.log('componentDidMount');
        });
        // console.log(document.getElementsByClassName('metismenu')[0].querySelector('li.active').parentNode);

    }
    componentWillUnmount() {
        DOMManipulation.removeEventListener('resize', () => {
            console.log('componentWillUnmount');
        });
        window.removeEventListener('orientationchange', () => {
            console.log('componentDidMount');
        });
    }
    render() {
        console.log('MainApp props', this.props);
        return (
            <div id="wrapper">
                <Sidebar />
                <div id="page-wrapper" className="gray-bg">
                    <TopNavBar />
                    <main id="main">
                        {this.props.children}
                    </main>
                    {/*Footer//TODO*/}
                </div>
            </div>
        )
    }
}
