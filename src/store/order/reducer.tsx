import { useSelector } from "react-redux";
import { get } from "lodash";

import {
    REQUEST_CUSTOMER_ORDER,
    REQUEST_UPDATE_CUSTOMER_ORDER,
    SET_CUSTOMER_ORDER,
    SUCCESS_UPDATE_CUSTOMER_ORDER,
    ERROR_GET_CUSTOMER_ORDER,
    ERROR_UPDATE_CUSTOMER_ORDER,
} from "./OrderActionTypes"

interface IState {
    busy: boolean;
    message: string;
    Orders: [];
}

const initialState: IState =
{
    busy: false,
    message: "",
    Orders: [],
};

const orders = (state = initialState, action: Record<string, any>) => {
    switch (action.type) {
        case REQUEST_CUSTOMER_ORDER:
        case REQUEST_UPDATE_CUSTOMER_ORDER:
            return {
                ...state,
                busy: true,
                message: "",
            };
        case SET_CUSTOMER_ORDER:
            return {
                ...state,
                busy: false,
                message: "",
                Orders: action.payload,
            };

        case SUCCESS_UPDATE_CUSTOMER_ORDER:
            return {
                ...state,
                busy: false,
                message: "",
                // Orders: state.Orders.map((mp) => {
                //     return get(mp, "_id") === action.payload._id ? action.payload : mp;
                // }),
            };

        case ERROR_GET_CUSTOMER_ORDER:
        case ERROR_UPDATE_CUSTOMER_ORDER:
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

export default orders;


export function useOrders() {
    return useSelector((state: Record<string, any>) => state.orders);
}