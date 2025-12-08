import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/ownerSlice";
import bookingReducer from "../slices/bookingSlice";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer,
            booking: bookingReducer
        }
    })
}

export default createStore;