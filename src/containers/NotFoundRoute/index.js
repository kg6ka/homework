import { Component } from 'react';
import { browserHistory } from 'react-router';

export default class NotFound extends Component {
    constructor(props) {
        super(props);

        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.isAuthenticated) {
            browserHistory.push('/');
        } else {
            browserHistory.push('/login');
        }
    }
    render() {
        return null;
    }
}
