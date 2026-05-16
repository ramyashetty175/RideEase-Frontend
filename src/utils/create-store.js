import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/ownerSlice.jsx";
import bookingReducer from "../slices/bookingSlice.jsx";
import vehicleReducer from "../slices/vehicleSlice.jsx";

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