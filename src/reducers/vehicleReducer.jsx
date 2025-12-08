export default function vehicleReducer(state, action) {
    switch(action.type) {
        case "SET_VEHICLE": {
            return { ...state, owner: action.payload }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}