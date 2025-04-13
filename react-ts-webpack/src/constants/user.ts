interface label {
    name: string,
    isRequire: boolean
}

const USER_INFO_LABELS: { [key: string]: label } = {
    0: {
        name: "用户ID(只读)",
        isRequire: true
    },
    1: {
        name: "用户名",
        isRequire: true
    },
    2: {
        name: "Email",
        isRequire: false
    },
    3: {
        name: "姓",
        isRequire: false
    },
    4: {
        name: "名",
        isRequire: false
    },
}

export default USER_INFO_LABELS
export const userInfoLabels = (status: number): label => USER_INFO_LABELS[status]