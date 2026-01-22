import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../slices/ownerSlice";
import bookingReducer from "../slices/bookingSlice";
import vehicleReducer from "../slices/vehicleSlice";
import bookingCancellationReducer from "../slices/bookingCancellationSlice";

const createStore = () => {
    return configureStore({
        reducer: {
            owner: ownerReducer,
            booking: bookingReducer,
            vehicle: vehicleReducer,
            bookingCancellation: bookingCancellationReducer
        }
    })
}

export default createStore;