import {combineReducers} from 'redux';
import adminReducer from './adminReducer';
import photoReducer from './photeReducer';

const rootReducer = combineReducers({
    admin: adminReducer,
    phote: photoReducer,
});

export default rootReducer;