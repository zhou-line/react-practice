const initialState = {
    role: true,
};

const playerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_ROLE':
            return {
                ...state,
                role: action.payload
            };
        default:
            return state;

    }
}

export default playerReducer;