export const setAuth = (auth: string) => {
    return {
        type: 'SET_AUTH',
        payload: auth
    };
};

export const setMenuKey = (menuKey: string) => {
    return {
        type: 'SET_MENU_KEY',
        payload: menuKey
    };
};

