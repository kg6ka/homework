import React, { Component } from 'react';
import { ButtonLink } from '../../components';

export default class Catalog extends Component {
    render() {
        return (
            <div>
                <h1>My Catalog</h1>
                <ButtonLink to="/catalogs/cars">To Categories</ButtonLink>
            </div>
        )
    }
}