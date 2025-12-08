import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/ownerSlice";
import bookingReducer from "../slices/bookingSlice";
import vehicleReducer from "../slices/vehicleSlice";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer,
            booking: bookingReducer,
            Vehicle: vehicleReducer
        }
    })
}

export default createStore;