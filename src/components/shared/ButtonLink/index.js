import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ButtonLink extends Component {
    render() {
        const { className } = this.props;
        return <Link className={className} role='button' {...this.props}/>
    }
}
