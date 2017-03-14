import React, { Component } from 'react';


import FA from 'react-fontawesome';
import { ButtonLink } from '../../components'

export default class Customers extends Component {
    render() {
        return (
            <seection className='role-info'>
                <header className='sub-header row white-bg'>
                    <div className='col-lg-12'>
                        <h1 className='title pull-left'>
                            Управление пользователями
                        </h1>
                    </div>
                </header>
                <div className='ibox-title animated fadeInRight'>
                    <ButtonLink className='btn btn-sm btn-primary'
                                to='user-management/create'>
                        <FA name='plus' className='m-r-xs' />
                        Создать пользователя
                    </ButtonLink>
                </div>
            </seection>
        )
    }
}
