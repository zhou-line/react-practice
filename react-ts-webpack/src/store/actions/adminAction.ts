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

export const setSuperuser = (superuser: boolean) => {
    return {
        type: 'SET_SUPER_USER',
        payload: superuser
    };
};

