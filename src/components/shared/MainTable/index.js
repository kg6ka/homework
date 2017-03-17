import React from 'react';
import FA from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { ButtonLink } from '../../../components';

export default (props) => {
    console.log(props);
    const { options } = props;
    const th = options.thead.map(item => <th key={item}>{item}</th>);

    const tbody = options.tbody.map((item, index) => {
        return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        <div className='btn-holder'>
                            <ButtonLink className='btn btn-success btn-sm'
                                        to='role-management/edit/'>
                                <FA name='pencil-square-o' />
                            </ButtonLink>
                            <Button
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
    return (
        <table className="table main-table">
            <thead><tr>{th}</tr></thead>
            <tbody>{tbody}</tbody>
        </table>
    )
}
