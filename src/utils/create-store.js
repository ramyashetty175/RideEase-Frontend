import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/OwnerSlice";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer
        }
    })
}

export default createStore;