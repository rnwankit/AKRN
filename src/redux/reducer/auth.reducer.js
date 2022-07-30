import * as ActionTypes from '../ActionTypes';

const initVal = {
    isLoading: false,
    userId: null,
    error: ''
}

export const authReducer = (state = initVal, action) => {
    console.log("zzzzzzzzzzz", state, action.type);
    switch (action.type) {
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                isLoading: true,
                userId: null,
                error: ''
            }
        case ActionTypes.AUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                userId: null,
                error: action.payload
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userId: action.payload,
                error: ''
            }
        case ActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userId: action.payload,
                error: ''
            }
        case ActionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userId: null,
                error: ''
            }
        default:
            return state
    }
}