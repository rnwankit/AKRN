import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getAllProduct } from '../../common/apis/product.api';
import { setProduct } from '../action/product.action';
import * as ActionTypes from '../ActionTypes';

function* fetchProducts() {
   try {
      const product = yield call(getAllProduct);
      console.log("hhh", product);
      yield put(setProduct(product));
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

export function* waitForProducts() {
  yield takeEvery(ActionTypes.GET_PRODUCT, fetchProducts);
}
