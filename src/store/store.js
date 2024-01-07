import { configureStore } from "@reduxjs/toolkit";
import baseSlice from "./baseSlice";

const store = configureStore({
    reducer: {
        user: baseSlice
    }
})

export default store;