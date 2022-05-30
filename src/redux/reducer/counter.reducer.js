import * as ActionTypes from '../ActionTypes';

const initVal = {
    count: 0
}

export const counterReducer = (state=initVal, action) => {
    console.log(state, action);
    switch(action.type) {
        case ActionTypes.INCREMENT_COUNTER:
            return {
                ...state,
                count: state.count + 1
            }
        case ActionTypes.DECREMENT_COUNTER:
            return {
                ...state,
                count: state.count - 1
            }
            default: 
                return state
    }
}