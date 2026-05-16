import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "../reducers/ownerReducer";
import bookingReducer from "../reducers/bookingReducer";
import vehicleReducer from "../reducers/vehicleReducer";

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