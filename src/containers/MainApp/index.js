import React, { Component } from 'react';
// import jQuery from 'jquery';

//Custom components
import Sidebar from '../../components/Sidebar';
import { TopNavBar } from '../../components/TopNavBar';
import * as DOMManipulation from '../../utils/DOMManipulation';

export default class MainApp extends Component {
    componentDidMount() {
        document.body.className = 'gray-bg pace-done';

        // window.addEventListener('resize', () => {
        //     console.log(1);
        //     DOMManipulation.minHeightApp();
        // });

        DOMManipulation.minHeightApp();
        window.addEventListener('orientationchange', () => {
            DOMManipulation.minHeightApp();
        });

        // console.log(document.getElementsByClassName('metismenu')[0].querySelector('li.active').parentNode);
    }
    componentWillUnmount() {
        // window.removeEventListener('orientationchange', () => {
        //     DOMManipulation.minHeightApp();
        // });
    }
    render() {
        let self = this;
        // console.log('MainApp props', this.props);
        const { user } = this.props;
        return (
            <div id="wrapper">
                <Sidebar user={user}/>
                <div id="page-wrapper" className="gray-bg">
                    <TopNavBar />
                    <main id="main">
                        {self.props.children}
                    </main>
                    {/*Footer//TODO*/}
                </div>
            </div>
        )
    }
}
