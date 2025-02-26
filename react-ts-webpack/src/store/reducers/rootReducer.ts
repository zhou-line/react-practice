import {combineReducers} from 'redux';
import playerReducer from "@/store/reducers/playerReducer";

const rootReducer = combineReducers({
    player: playerReducer,
});

export default rootReducer;