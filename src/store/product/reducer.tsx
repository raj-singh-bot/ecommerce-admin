
import { useSelector } from "react-redux";
import { get } from "lodash";

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
    SET_MESSAGE_MASTER_PRODUCT,
    SUCCESS_DELETE_PRODUCT,
    ERROR_DELETE_PRODUCT,
} from "./productActionTypes"
// import { IProducts } from "../../types/IProducts";

interface IState {
    busy: boolean;
    message: string;
    masterProducts: [];
}

const initialState: IState =
{
    busy: false,
    message: "",
    masterProducts: [],
};

const products = (state = initialState, action: Record<string, any>) => {
    switch (action.type) {
        case REQUEST_MASTER_PRODUCT:
        case REQUEST_CREATE_MASTER_PRODUCT:
        case REQUEST_UPDATE_MASTER_PRODUCT:
            return {
                ...state,
                busy: true,
                message: "",
            };

        case SET_MESSAGE_MASTER_PRODUCT:
            return {
                ...state,
                message: "",
            };

        case SET_MASTER_PRODUCT:
            return {
                ...state,
                busy: false,
                message: "",
                masterProducts: action.payload,
            };

        case SUCCESS_CREATE_MASTER_PRODUCT:
            console.log(state.masterProducts)
            return {
                ...state,
                busy: false,
                message: "",
                masterProducts: [...state.masterProducts, action.payload],
            };

        case SUCCESS_UPDATE_MASTER_PRODUCT:
            return {
                ...state,
                busy: false,
                message: "",
                masterProducts: state.masterProducts.map((mp) => {
                    return get(mp, "_id") === action.payload._id ? action.payload : mp;
                }),
            };

        case SUCCESS_DELETE_PRODUCT:
            console.log(action.payload.productId)
            return {
                ...state,
                busy: false,
                message: "",
                masterProducts: state.masterProducts.filter(
                    (mg:any) => (mg._id) !== action.payload.productId
                ),
            };
    
        case ERROR_GET_MASTER_PRODUCT:
        case ERROR_CREATE_MASTER_PRODUCT:
        case ERROR_UPDATE_MASTER_PRODUCT:
        case ERROR_DELETE_PRODUCT:
            return {
                ...state,
                busy: false,
                message:
                    action.payload || "Something happened wrong try again after sometime",
            };
        default:
            return state;
    }
}

export default products;


export function useProductsMaster() {
    return useSelector((state: Record<string, any>) => state.products);
}
