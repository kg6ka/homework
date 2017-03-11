import React, { Component } from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import { Form } from 'formsy-react';
import MyInput from '../../components/shared/MyInput';

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
            canSubmit: false,
            roleName: '',
            options: FLAVOURS,
            value: [
                { label: 'Chocolate', value: 'chocolate' },
                { label: 'Vanilla', value: 'vanilla' }
            ]
        };
    }

    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    handleSubmit(data) {
        console.log(data);
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
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
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Создание роли
                        </h1>
                    </div>
                </header>
                <div className='clearfix'>
                    <Button bsStyle='warning'
                            bsSize='small'
                            onClick={::this.backToPrevious}>
                        <FA name='chevron-left' className='m-r-xs'/>
                        Вернуться
                    </Button>
                </div>
                <div className='clearfix'>
                    <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                          noValidate='noValidate'
                          name='loginForm'
                          onSubmit={::this.handleSubmit}
                          onValid={::this.enableButton}
                          onInvalid={::this.disableButton}
                          role='form'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label htmlFor='userEmail'>Название роли</label>
                                    <MyInput value={this.state.roleName}
                                             type='text'
                                             name='roleName'
                                             placeholder='Название роли'
                                             validations='isEmail'
                                             validationError='Пожалуйста заполните поле'
                                             required />
                                </div>
                                <div className='form-group'>
                                    <label>Права</label>
                                    <Select multi
                                            simpleValue
                                            disabled={this.state.disabled}
                                            value={this.state.value}
                                            placeholder='Select your favourite(s)'
                                            options={this.state.options}
                                            onChange={::this.handleSelectChange} />
                                </div>
                                <div className='form-group text-center'>
                                    <Button type='submit'
                                            disabled={!this.state.canSubmit}
                                            bsStyle='primary'
                                            bsSize='small'>
                                        <FA name='plus m-r-xs' />
                                        Создать
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </seection>
        )
    }
}