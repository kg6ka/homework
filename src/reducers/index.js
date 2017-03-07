import { combineReducers } from 'redux';
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
// import of the custom reducers
import user from './User';

export default combineReducers({
    user,
    pendingTasks
})