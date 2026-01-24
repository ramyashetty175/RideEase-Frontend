export default function vehicleReducer(state, action) {
    switch(action.type) {
        case "SET_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "ADD_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "UPDATE_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "SET_VEHICLE_SEARCH": {
            return { ...state, vehicles: action.payload }
        }
        case "APPROVE_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "REJECT_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "REMOVE_VEHICLE": {
            return { ...state, vehicle: null }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}