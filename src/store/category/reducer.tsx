
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
    ERROR_DELETE_CATEGORY,
    SUCCESS_DELETE_CATEGORY,
} from "./categoryActionTypes"
import Category from "../../pages/Category/Category";
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
const buildNewCategories:any = (parentId:any, categories:any, category:any) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }
    console.log(parentId, categories, category)
    let cat:any
    for( cat of categories){

        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}



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
            console.log(state.Category)
            console.log(action)
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.Category, category);
            console.log('updated categoires', updatedCategories);
            return {
                ...state,
                busy: false,
                message: "",
                Category:  updatedCategories,
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
        
        case SUCCESS_DELETE_CATEGORY:
            return {
                ...state,
                busy: false,
                message: "",
                Category: action.payload,
            }

        case ERROR_GET_MASTER_CATEGORY:
        case ERROR_CREATE_MASTER_CATEGORY:
        case ERROR_UPDATE_MASTER_CATEGORY:
        case ERROR_DELETE_CATEGORY:
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
