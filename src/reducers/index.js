import { combineReducers } from 'redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
import { routerReducer } from 'react-router-redux'
// import of the custom reducers
import user from './User';
import roles from './Roles';
import permissions from './Permissions';
import localization from './Localization';
import customers from './Customers';

export default combineReducers({
    user,
    roles,
    permissions,
    localization,
    customers,
    routing: routerReducer,
    pendingTasks
})