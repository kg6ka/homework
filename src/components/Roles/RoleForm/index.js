import React from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';

import { Form } from 'formsy-react';
import MyInput from '../../../components/shared/MyInput';

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i
};

export default (props) => {
    return (
        <div className='clearfix holder-position form-holder'>
            <Form className='m-t m-b-xl col-sm-offset-3 col-sm-6 main-form'
                  noValidate='noValidate'
                  name='editForm'
                  onSubmit={props.onSubmit}
                  onValid={props.onValid}
                  onInvalid={props.onInvalid}
                  role='form'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='form-group'>
                            <label htmlFor='userEmail'>Название роли</label>
                            <MyInput value={props.roleName}
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
                                    disabled={props.disabledSelect}
                                    value={props.value}
                                    placeholder='Выберите права'
                                    options={props.options}
                                    onChange={props.onChange}/>
                        </div>
                        <div className='form-group text-center'>
                            <Button type='submit'
                                    disabled={props.disabledSubmit}
                                    bsStyle='primary'
                                    bsSize='small'>
                                <FA name='plus m-r-xs'/>
                                {props.submitText}
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
            <Button bsStyle='warning'
                    bsSize='small'
                    className='absolute-box'
                    onClick={props.backToPrevious}>
                <FA name='chevron-left' className='m-r-xs'/>
                Вернуться
            </Button>
        </div>
    );
}
