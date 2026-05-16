import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../slices/bookingSlice";
import vehicleReducer from "../slices/vehicleSlice";
import ownerReducer from "../slices/ownerSlice.jsx";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer,
            booking: bookingReducer,
            vehicle: vehicleReducer
        }
    })
}

export default createStore;