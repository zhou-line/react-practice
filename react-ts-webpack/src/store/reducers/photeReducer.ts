const initialState = {
    selectedIndex: -1,
    messageApi: null,
    loading: true,
};

const photoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX':
            return {
                ...state,
                selectedIndex: action.payload
            };
        case 'SET_MESSAGE_API':
            return {
                ...state,
                messageApi: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;

    }
}

export default photoReducer;