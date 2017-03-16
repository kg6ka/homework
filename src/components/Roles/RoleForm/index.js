import React, { Component } from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';

import { Form } from 'formsy-react';
import MyInput from '../../../components/shared/MyInput';

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i
};

export default class RoleForm extends Component {
    constructor(props) {
        super(props);
        console.log('RoleForm', this);
    }
    render() {
        return (
            <div className='clearfix holder-position form-holder'>
                <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                      noValidate='noValidate'
                      name='editForm'
                      onSubmit={this.props.onSubmit}
                      onValid={this.props.onValid}
                      onInvalid={this.props.onInvalid}
                      role='form'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='form-group'>
                                <label htmlFor='userEmail'>Название роли</label>
                                <MyInput value={this.props.roleName}
                                         type='text'
                                         name='roleName'
                                         placeholder='Название роли'
                                         validations={validators}
                                         validationError='Формат должен состоять минимум из 3 буквы и цифры'
                                         required/>
                            </div>
                            <div className='form-group'>
                                <label>Права</label>
                                <Select multi
                                        simpleValue
                                        disabled={this.props.disabledSelect}
                                        value={this.props.value}
                                        placeholder='Select your favourite(s)'
                                        options={this.props.options}
                                        onChange={this.props.onChange}/>
                            </div>
                            <div className='form-group text-center'>
                                <Button type='submit'
                                        disabled={this.props.disabledSubmit}
                                        bsStyle='primary'
                                        bsSize='small'>
                                    <FA name='plus m-r-xs'/>
                                    Создать
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
                <Button bsStyle='warning'
                        bsSize='small'
                        className='absolute-box'
                        onClick={this.props.backToPrevious}>
                    <FA name='chevron-left' className='m-r-xs'/>
                    Вернуться
                </Button>
            </div>
        )
    }
}
