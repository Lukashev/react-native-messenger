const INITIAL_STATE = {
    email: '',
    password: '',
    retypedPassword: '',
    rememberMe: false
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_AUTH_STATE':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

