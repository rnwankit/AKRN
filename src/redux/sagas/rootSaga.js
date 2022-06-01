import { all } from "redux-saga/effects";
import { waitForProducts } from "./product.saga";

export default function* rootSaga() {
    yield all([
        waitForProducts()
    ])
}