import axios from "axios";
import { get } from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_MASTER_PRODUCT,
    REQUEST_CREATE_MASTER_PRODUCT,
    REQUEST_UPDATE_MASTER_PRODUCT,
    SET_MASTER_PRODUCT,
    SUCCESS_CREATE_MASTER_PRODUCT,
    SUCCESS_UPDATE_MASTER_PRODUCT,
    ERROR_GET_MASTER_PRODUCT,
    ERROR_CREATE_MASTER_PRODUCT,
    ERROR_UPDATE_MASTER_PRODUCT,
    REQUEST_DELETE_PRODUCT,
    SUCCESS_DELETE_PRODUCT,
} from "./productActionTypes"

function* requestMasterProduct(action: Record<string, any>): any {
    try {
        const result: any = yield call(getProductMaster);
        console.log(result.data.data)
        yield put({ type: SET_MASTER_PRODUCT, payload: result.data.data });
        // console.warn(result.data);
    } catch (error: any) {
        console.log(error);
        let message =
            "Something went wrong, please try again after some time or Refresh the Page.";
        if (get(error, "response.status") === 500) {
            message = "Something happened wrong try again after sometime.";
        } else if (get(error, "response.status") === 422) {
            message = error.response.data.message || "please provide valid contain";
        } else if (get(error, "response.status") === 415) {
            message = error.response.data.message;
        }
        yield put({ type: ERROR_GET_MASTER_PRODUCT, payload: message });
    }
}

function* requestUpdateMasterProduct(action: Record<string, any>): any {
    try {
        const result = yield call(
            updateMasterProduct,
            action.data.payload,
            action.data._id
        )
        yield put({
            type: SUCCESS_UPDATE_MASTER_PRODUCT,
            payload: result.data,
        });
    } catch (error: any) {
        console.log(error);
        let message =
            "Something went wrong, please try again after some time or Refresh the Page.";
        if (get(error, "response.status") === 500) {
            message = "Something happened wrong try again after sometime.";
        } else if (get(error, "response.status") === 422) {
            message = error.response.data.message || "please provide valid contain";
        } else if (get(error, "response.status") === 415) {
            message = error.response.data.message;
        }
        yield put({ type: ERROR_UPDATE_MASTER_PRODUCT, payload: message });
    }
}

function* requestCreateMasterProduct(action: Record<string, any>): any {
    try {
        const result = yield call(createMasterProduct, action.payload);
        console.log(result)
        yield put({
            type: SUCCESS_CREATE_MASTER_PRODUCT,
            payload: result.data.product,
        });
        // update relevant category as well
    } catch (error: any) {
        console.log(error);
        let message ="Something went wrong, please try again after some time or Refresh the Page.";
        if (get(error, "response.status") === 500) {
            message = "Something happened wrong try again after sometime.";
        } else if (get(error, "response.status") === 422) {
            message = error.response.data.message || "please provide valid contain";
        } else if (get(error, "response.status") === 415) {
            message = error.response.data.message;
        }
        yield put({ type: ERROR_CREATE_MASTER_PRODUCT, payload: message });
    }
}

function* requestMasterDeleteProduct(action: Record<string, any>): any {
    try {
      yield call(deleteProduct, (action.payload));
      yield put({
        type: SUCCESS_DELETE_PRODUCT,
        payload: action.payload,
      });
    } catch (error: any) {
      let message =
        "Something went wrong, please try again after some time or Refresh the Page.";
      if (get(error, "response.status") === 500) {
        message = "Something happened wrong try again after sometime.";
      } else if (get(error, "response.status") === 422) {
        message = "please provide valid contain";
      } else if (get(error, "response.status") === 415) {
        message = error.response.data.message;
      }
    }
  }

export function getProductMaster() {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL}/product/getProducts`,
        headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
        }
    });
}

export function updateMasterProduct(payload: Record<string, any>, _id: string) {
    return axios({
        method: "put",
        url: `${process.env.REACT_APP_BASE_URL}/product/product/${_id}`,
        data: payload,
    });
}

export function createMasterProduct(payload: Record<string, any>) {
    console.log(payload)
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/product/create`,
        data: payload,
        headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
        }
    });
}

export function deleteProduct(_id: any) {
    console.log(_id)
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/product/product/${_id.productId}`,
      data:{_id},
      headers:{
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
    }
    });
  }



const productMasterSaga = function* () {
    yield all([
        takeLatest(REQUEST_MASTER_PRODUCT, requestMasterProduct),
        takeLatest(REQUEST_UPDATE_MASTER_PRODUCT, requestUpdateMasterProduct),
        takeLatest(REQUEST_CREATE_MASTER_PRODUCT, requestCreateMasterProduct),
        takeLatest(REQUEST_DELETE_PRODUCT, requestMasterDeleteProduct),
    ])
}

export default productMasterSaga;