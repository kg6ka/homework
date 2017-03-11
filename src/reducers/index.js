import { combineReducers } from 'redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
import { routerReducer } from 'react-router-redux'
// import of the custom reducers
import user from './User';
import roles from './Roles';

export default combineReducers({
    user,
    roles,
    routing: routerReducer,
    pendingTasks
})