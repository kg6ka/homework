import { combineReducers } from 'redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
// import of the custom reducers
import user from './User';
import roles from './Roles';

export default combineReducers({
    user,
    roles,
    pendingTasks
})