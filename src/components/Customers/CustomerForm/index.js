import React from 'react';
import Select from 'react-select';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';

import { Form } from 'formsy-react';
import MyInput from '../../../components/shared/MyInput';

import { ButtonLink } from '../../../components';

const validators = {
    matchRegexp: /^[a-z0-9а-яё/\s]+$/i,
    minLength: 3
};

export default (props) => {
    let confirm = null;
    if (props.confirm) {
        confirm = <div className='form-group'>
                    <label htmlFor='password'>Подтвердите пароль</label>
                    <MyInput value={props.state.confirmPass}
                             type='password'
                             name='confirm_password'
                             placeholder='Подтвердите пароль'
                             validations='equalsField:password'
                             validationError='Пароль не совпадает'
                             required/>
                    </div>;
    }
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
                        <div className='form-group row'>
                            <div className='col-lg-6'>
                                <label htmlFor='first_name'>Имя</label>
                                <MyInput value={props.state.first_name}
                                         type='text'
                                         name='first_name'
                                         placeholder='Имя'
                                         validations={validators}
                                         validationErrors={{
                                             matchRegexp: 'Неверные формат',
                                             minLength: `Имя должно состоять минимум из ${validators.minLength} символов`
                                         }}
                                         required/>
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor='last_name'>Фамилия</label>
                                <MyInput value={props.state.last_name}
                                         type='text'
                                         name='last_name'
                                         placeholder='Фамилия'
                                         validations={validators}
                                         validationErrors={{
                                             matchRegexp: 'Неверные формат',
                                             minLength: `Фамилия должна состоять минимум из ${validators.minLength} символов`
                                         }}
                                         required/>
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className='col-lg-6'>
                                <label htmlFor='phone'>Телефон</label>
                                <MyInput value={props.state.phone}
                                         type='tel'
                                         name='phone'
                                         placeholder='Телефон'
                                         validations={{
                                             matchRegexp: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                                         }}
                                         validationError='Телефон должен содержать 10 цифр'
                                         required/>
                            </div>
                            <div className='col-lg-6'>
                                <label htmlFor='job_title'>Должность</label>
                                <MyInput value={props.state.job_title}
                                         type='text'
                                         name='job_title'
                                         placeholder='Должность'
                                         validations={validators}
                                         validationErrors={{
                                             matchRegexp: 'Некорректный формат',
                                             isLength: `Телефон должен содержать ${validators.minLength} цифры`
                                         }}
                                         required/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <MyInput value={props.state.email}
                                     type='email'
                                     name='email'
                                     placeholder='Email'
                                     validations='isEmail'
                                     validationError='Неверный email'
                                     required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Пароль</label>
                            <MyInput value={props.state.password}
                                     type='password'
                                     name='password'
                                     placeholder='Пароль'
                                     validations={{
                                         isAlphanumeric: true,
                                         minLength: 6
                                     }}
                                     validationErrors={{
                                         isAlphanumeric: 'Пароль должен содержать буквы и цыфры латинского алфавита',
                                         minLength: 'Пароль должен содержать минимум 6 символов'
                                     }}
                                     required/>
                        </div>
                        {confirm}
                        <div className='form-group row'>
                            <div className='col-lg-4 p-t-md'>
                                <ButtonLink className='btn btn-sm btn-success'
                                            to='role-management/create'>
                                    <FA name='plus' className='m-r-xs' />
                                    Создать роль
                                </ButtonLink>
                            </div>
                            <div className='col-lg-8'>
                                <label>Роли</label>
                                <Select simpleValue
                                        name="selected-state"
                                        value={props.state.value}
                                        placeholder='Выберите роль'
                                        options={props.options}
                                        onChange={props.onChange}/>
                            </div>
                        </div>
                        <div className='form-group text-center'>
                            <Button type='submit'
                                    disabled={!props.state.fullField}
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
