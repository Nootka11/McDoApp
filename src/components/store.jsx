import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"

const store = configureStore({
    reducer:{
        address: dataReducer,
    }
});
export default store;