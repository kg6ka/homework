import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ButtonLink extends Component {
    render() {
        return <Link className='btn btn-primary' role='button' {...this.props}/>
    }
}
