import React, { Component } from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import 'react-select/dist/react-select.css';

const FLAVOURS = [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Caramel', value: 'caramel' },
    { label: 'Cookies and Cream', value: 'cookiescream' },
    { label: 'Peppermint', value: 'peppermint' }
];

export default class CreateRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            crazy: false,
            options: FLAVOURS,
            value: [
                { label: 'Chocolate', value: 'chocolate' },
                { label: 'Vanilla', value: 'vanilla' }
            ]
        };
    }

    handleSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    // toggleDisabled (e) {
    //     this.setState({ disabled: e.target.checked });
    // }

    backToPrevious() {
        browserHistory.push('/role-management');
    }

    render() {
        return (
            <seection className='role-info'>
                <h1>Создать роль</h1>
                <Button bsStyle='warning'
                        bsSize='small'
                        onClick={::this.backToPrevious}>
                    <FA name='chevron-left' />
                </Button>
                <form noValidate='noValidate'
                    name='loginForm'
                    role='form'>
                    <input type="email"
                           name="userEmail"
                           className="form-control"
                           placeholder="Email"
                           value={this.state.userEmail}
                           required/>
                    <Select multi
                            simpleValue
                            disabled={this.state.disabled}
                            value={this.state.value}
                            placeholder="Select your favourite(s)"
                            options={this.state.options}
                            onChange={::this.handleSelectChange} />
                    <Button bsStyle='primary' bsSize='small'>
                        <FA name='plus m-r-xs' />
                        Создать
                    </Button>
                </form>
            </seection>
        )
    }
}