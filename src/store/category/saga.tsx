import axios from "axios";
import { get } from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    REQUEST_MASTER_CATEGORY,
    REQUEST_CREATE_MASTER_CATEGORY,
    REQUEST_UPDATE_MASTER_CATEGORY,
    SET_MASTER_CATEGORY,
    SUCCESS_CREATE_MASTER_CATEGORY,
    SUCCESS_UPDATE_MASTER_CATEGORY,
    ERROR_GET_MASTER_CATEGORY,
    ERROR_CREATE_MASTER_CATEGORY,
    ERROR_UPDATE_MASTER_CATEGORY,
} from "./categoryActionTypes"

function* requestMasterCategory(action: Record<string, any>): any {
    try {
        const result: any = yield call(getProductMaster);
        yield put({ type: SET_MASTER_CATEGORY, payload: result.data });
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
        yield put({ type: ERROR_GET_MASTER_CATEGORY, payload: message });
    }
}

function* requestUpdateMasterCategory(action: Record<string, any>): any {
    try {
        const result = yield call(
            updateMasterProduct,
            action.data.payload,
            action.data._id
        )
        yield put({
            type: SUCCESS_UPDATE_MASTER_CATEGORY,
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
        yield put({ type: ERROR_UPDATE_MASTER_CATEGORY, payload: message });
    }
}

function* requestCreateMasterCategory(action: Record<string, any>): any {
    try {
        const result = yield call(createMasterProduct, action.payload);
        yield put({
            type: SUCCESS_CREATE_MASTER_CATEGORY,
            payload: result.data,
        });
        // update relevant category as well
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
        yield put({ type: ERROR_CREATE_MASTER_CATEGORY, payload: message });
    }
}


export function getProductMaster() {
    return axios({
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL}/category/getcategory`,
        
    });
}

export function updateMasterProduct(payload: Record<string, any>, _id: string) {
    return axios({
        method: "patch",
        url: `${process.env.REACT_APP_BASE_URL}/category/product/${_id}`,
        data: payload,
        withCredentials: true,
    });
}

export function createMasterProduct(payload: Record<string, any>) {
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/category/create`,
        data: payload,
        withCredentials: true,
    });
}


const categoryMasterSaga = function* () {
    yield all([
        takeLatest(REQUEST_MASTER_CATEGORY, requestMasterCategory),
        takeLatest(REQUEST_UPDATE_MASTER_CATEGORY, requestUpdateMasterCategory),
        takeLatest(REQUEST_CREATE_MASTER_CATEGORY, requestCreateMasterCategory),

    ])
}

export default categoryMasterSaga;