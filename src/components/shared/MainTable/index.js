import React from 'react';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../../components';

export default (props) => {
    const { options } = props;
    let tbody = null;
    const th = options.thead.map(item => <th key={item}>{item}</th>);

    if (options.permissions) {
        tbody = options.tbody.map((item, index) => {
            return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>
                            <ul className='info-list'>
                                {
                                    item.permissions.map(permission =>
                                        <li key={permission.id}>
                                            <span className='label btn-status label-primary'>
                                                {permission.name.toLowerCase()}
                                            </span>
                                        </li>
                                    )
                                }
                            </ul>
                        </td>
                        <td>
                            <div className='btn-holder'>
                                <ButtonLink className='btn btn-success btn-sm'
                                            to={`role-management/edit/${item.id}`}>
                                    <FA name='pencil-square-o' />
                                </ButtonLink>
                                <Button onClick={options.showModal.bind(this, item.id)}
                                        bsStyle='danger'
                                        bsSize='small'>
                                    <FA name='times' />
                                </Button>
                            </div>
                        </td>
                    </tr>
                    )
                }
        );
    } else {
        tbody = options.tbody.map(item => {
            return (
               <tr key={item.id} className={(item.block ? 'block' : 'unblock') + ' ' + (item.active ? 'is-active' : 'is-not-active')}>
                   <td>{`${item.first_name} ${item.last_name}`}</td>
                   <td>{item.roleName}</td>
                   <td>{item.email}</td>
                   <td>{item.job_title}</td>
                   <td>
                       <div className='btn-holder'>
                           <ButtonLink className='btn btn-success btn-sm'
                                       to={`user-management/edit/${item.id}`}>
                               <FA name='pencil-square-o' />
                           </ButtonLink>
                           <Button onClick={options.reInviteCustomer.bind(this, item.email)}
                                   bsStyle='warning'
                                   bsSize='small'>
                               <FA name='paper-plane-o' />
                           </Button>
                           <Button onClick={options.isBlockCustomer.bind(this, item.id, item.block)}
                                   bsStyle='danger'
                                   bsSize='small'>
                               <FA name='times' />
                           </Button>
                       </div>
                   </td>
               </tr>
            )
        });
    }
    return (
        <table className={`table main-table ${props.className}`}>
            <thead><tr>{th}</tr></thead>
            <tbody>{tbody}</tbody>
        </table>
    )
}
