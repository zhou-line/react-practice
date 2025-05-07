const initialState = {
    selectedIndex: -1,
};

const photoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX':
            return {
                ...state,
                selectedIndex: action.payload
            };
        default:
            return state;

    }
}

export default photoReducer;