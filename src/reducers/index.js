import { combineReducers } from 'redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
import { routerReducer } from 'react-router-redux'
// import of the custom reducers
import user from './User';
import roles from './Roles';
import permissions from './Permissions';

export default combineReducers({
    user,
    roles,
    permissions,
    routing: routerReducer,
    pendingTasks
})