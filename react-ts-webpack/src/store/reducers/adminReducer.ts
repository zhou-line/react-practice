const initialState = {
    auth: '',
    menuKey: 'home',
};

const adminReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                auth: action.payload
            };
        case 'SET_MENU_KEY':
            return {
                ...state,
                menuKey: action.payload
            };
        default:
            return state;

    }
}

export default adminReducer;