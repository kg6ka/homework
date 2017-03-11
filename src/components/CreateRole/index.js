import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class CreateRole extends Component {
    constructor(props) {
        super(props);
    }
    getOptions(input, callback) {
        setTimeout(() => {
            callback(null, {
                options: [
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' }
                ],
                complete: true
            });
        }, 500);
    }

    render() {
        return (
            <seection className='role-info'>
                <h1>Создать роль</h1>
                <Select.Async
                    name='form-field-name'
                    multi={true}
                    loadOptions={this.getOptions.bind(this)}
                />
            </seection>
        )
    }
}