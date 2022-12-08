
import { useSelector } from "react-redux";
import { get } from "lodash";

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
    SET_MESSAGE_MASTER_CATEGORY,
} from "./categoryActionTypes"
// import { IProducts } from "../../types/IProducts";

interface IState {
    busy: boolean;
    message: string;
    Category: [];
}

const initialState: IState =
{
    busy: false,
    message: "",
    Category: [],
};

const category = (state = initialState, action: Record<string, any>) => {
    switch (action.type) {
        case REQUEST_MASTER_CATEGORY:
        case REQUEST_CREATE_MASTER_CATEGORY:
        case REQUEST_UPDATE_MASTER_CATEGORY:
            return {
                ...state,
                busy: true,
                message: "",
            };

        case SET_MESSAGE_MASTER_CATEGORY:
            return {
                ...state,
                message: "",
            };

        case SET_MASTER_CATEGORY:
            return {
                ...state,
                busy: false,
                message: "",
                Category: action.payload,
            };

        case SUCCESS_CREATE_MASTER_CATEGORY:
            return {
                ...state,
                busy: false,
                message: "",
                Category: [...state.Category, action.payload],
            };

        case SUCCESS_UPDATE_MASTER_CATEGORY:
            return {
                ...state,
                busy: false,
                message: "",
                Category: state.Category.map((mp) => {
                    return get(mp, "_id") === action.payload._id ? action.payload : mp;
                }),
            };

        case ERROR_GET_MASTER_CATEGORY:
        case ERROR_CREATE_MASTER_CATEGORY:
        case ERROR_UPDATE_MASTER_CATEGORY:
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

export default category;


export function useCategoryMaster() {
    return useSelector((state: Record<string, any>) => state.category);
}
