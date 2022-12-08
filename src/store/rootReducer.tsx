import { combineReducers } from "@reduxjs/toolkit";
import category from './category/reducer'
import products from './product/reducer'

export default combineReducers({
    category,
    products
})