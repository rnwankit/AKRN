import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { productReducer } from "./product.reducer";

export const rootReducer = combineReducers({
    product: productReducer,
    counter: counterReducer
})