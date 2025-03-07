import {combineReducers} from 'redux';
import adminReducer from '@/store/reducers/adminReducer';

const rootReducer = combineReducers({
    admin: adminReducer,
});

export default rootReducer;