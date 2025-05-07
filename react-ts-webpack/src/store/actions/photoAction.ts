export const setSelectedIndex = (selectedIndex: number) => {
    return {
        type: 'SET_SELECTED_INDEX',
        payload: selectedIndex
    };
};