import { all, fork } from "redux-saga/effects";
import categoryMasterSaga from './category/saga'
import productMasterSaga from "./product/saga";

export default function* rootSaga() {
    yield all([
      fork(categoryMasterSaga),
      fork(productMasterSaga)
    ]);
}