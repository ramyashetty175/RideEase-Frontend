export default function vehicleReducer(state, action) {
    switch(action.type) {
        case "SET_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "CREATE_VEHICLE": {
            return { ...state, vehicle: action.payload }
        }
        case "UPDATE_VEHICLE": {
            return { ...state, vehicle: action.payload }
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