import axios from "axios";
import { get } from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_CUSTOMER_ORDER,
    REQUEST_UPDATE_CUSTOMER_ORDER,
    SET_CUSTOMER_ORDER,
    SUCCESS_UPDATE_CUSTOMER_ORDER,
    ERROR_GET_CUSTOMER_ORDER,
    ERROR_UPDATE_CUSTOMER_ORDER,
} from "./OrderActionTypes"

function* requestMasterCategory(action: Record<string, any>): any {
    try {
        const result: any = yield call(getProductMaster);
        yield put({ type: SET_CUSTOMER_ORDER, payload: result.data.order });
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
        yield put({ type: ERROR_GET_CUSTOMER_ORDER, payload: message });
    }
}

function* requestUpdateMasterCategory(action: Record<string, any>): any {
    try {
        const result = yield call(
            updateMasterProduct,
            action.payload,
        )
        yield put({
            type: SUCCESS_UPDATE_CUSTOMER_ORDER,
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
        yield put({ type: ERROR_UPDATE_CUSTOMER_ORDER, payload: message });
    }
}


export function getProductMaster() {
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/admin/order/getCustomerOrders`,
        headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
        }
    });
}

export function updateMasterProduct(payload: Record<string, any>) {
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/admin/order/update`,
        data: payload,
        headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
        }
    });
}

// export function createMasterProduct(payload: Record<string, any>) {
//     console.log(payload)
//     return axios({
//         method: "post",
//         url: `${process.env.REACT_APP_BASE_URL}/category/create`,
//         data: payload,
//         headers:{
//             'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
//         }
//     });
// }

// export function deleteCategory(payload: any) {
//     console.log(payload)
//     return axios({
//       method: "post",
//       url: `${process.env.REACT_APP_BASE_URL}/category/deleteCategory`,
//       data:{payload},
//       headers:{
//         'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth-token')!).token}`
//     }
//     });
//   }

const customerOrderSaga = function* () {
    yield all([
        takeLatest(REQUEST_CUSTOMER_ORDER, requestMasterCategory),
        takeLatest(REQUEST_UPDATE_CUSTOMER_ORDER, requestUpdateMasterCategory),
    ])
}

export default customerOrderSaga;