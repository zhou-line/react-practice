interface label {
    id: string,
    name: string,
    isSelect: boolean
}

const USER_INFO_LABELS: { [key: string]: label } = {
    0: {
        id: 'id',
        name: "用户ID",
        isSelect: false
    },
    1: {
        id: 'username',
        name: "用户名",
        isSelect: false
    },
    2: {
        id: 'email',
        name: "Email",
        isSelect: false
    }
}

export default USER_INFO_LABELS
export const userInfoLabels = (status: number): label => USER_INFO_LABELS[status]


export interface User {
    id?: string,
    username?: string,
    email?: string,
    date_joined?: string
}