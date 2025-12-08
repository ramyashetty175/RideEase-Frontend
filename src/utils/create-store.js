import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/OwnerSlice";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer,
            booking: bookingReducer
        }
    })
}

export default createStore;