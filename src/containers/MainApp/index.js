import React, { Component } from 'react';
//Custom components
import Sidebar from '../../components/Sidebar';
import { TopNavBar } from '../../components/TopNavBar';

export default class MainApp extends Component {
    componentDidMount() {
        // document.body.classList.add('gray-bg');
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
