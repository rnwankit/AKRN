import * as ActionTypes from '../ActionTypes';

const initVal = {
    isLoading: false,
    product: [],
    error: ''
}

export const productReducer = (state=initVal, action) => {
    console.log("zzzzzzzzzzz", state, action.type);
    switch(action.type) {
        case ActionTypes.LOADING_PRODUCT:
            return {
                ...state,
                product: [],
                isLoading: true,
                error: ''
            }
        case ActionTypes.RETRIEVED_PRODUCT:
            return {
                ...state,
                product: action.payload,
                isLoading: false,
                error: ''
            }
            case ActionTypes.INSERT_PRODUCT:
                return {
                    ...state,
                    product: state.product.concat(action.payload),
                    isLoading: false,
                    error: ''
                }
            case ActionTypes.DELETE_PRODUCT:
                return {
                    ...state,
                    product: state.product.filter((p) => p.id !== action.payload),
                    isLoading: false,
                    error: ''
                }
            case ActionTypes.UPDATE_PRODUCT:
                return {
                    ...state,
                    product: action.payload,
                    isLoading: false,
                    error: ''
                }
            case ActionTypes.ERROR_PRODUCT:
                return {
                    ...state,
                    product: [],
                    isLoading: false,
                    error: action.payload
                }
            default: 
                return state
    }
}