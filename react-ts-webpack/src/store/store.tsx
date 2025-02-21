import { legacy_createStore as createStore } from 'redux';

import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

// 整个Redux store的状态类型
export type RootState = ReturnType<typeof rootReducer>;
export default store;