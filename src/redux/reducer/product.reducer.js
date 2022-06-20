import * as ActionType from '../ActionType'

const initValue = {
    isLoading: false,
    product: [],
    error: ''
}

export const productReducer = (state = initValue, action) => {
    switch (action.type) {
        case ActionType.LOADING_PRODUCT:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.RETRIEVE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                isLoading: false,
                error: ''
            }
        case ActionType.INSERTED_PRODUCT:
            return {
                ...state,
                product: state.product.concat(action.payload),
                isLoading: false,
                error: ''
            }
        case ActionType.DELETED_PRODUCT:
            return {
                ...state,
                product: state.product.filter((p) => p.id !== action.payload),
                isLoading: false,
                error: ''
            }
            case ActionType.UPDATED_PRODUCT:
                let d = state.product.map((p) => p.id === action.payload.id ? action.payload : p);
                console.log(d);
                return {
                    ...state,
                    product: state.product.map((p) => p.id === action.payload.id ? action.payload : p),
                    isLoading: false,
                    error: ''
                }
        case ActionType.ERROR_PRODUCT:
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