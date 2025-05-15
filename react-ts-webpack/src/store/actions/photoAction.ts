export const setSelectedIndex = (selectedIndex: number) => {
    return {
        type: 'SET_SELECTED_INDEX',
        payload: selectedIndex
    };
};

export const setMessageApi = (messageApi: any) => {
    return {
        type: 'SET_MESSAGE_API',
        payload: messageApi
    };
};

export const setLoading = (loading: boolean) => {
    return {
        type: 'SET_LOADING',
        payload: loading
    };
};

export const setStudyGroup = (group: string) => {
    return {
        type: 'SET_GROUP',
        payload: group
    };
};

