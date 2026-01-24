export default function bookingSlice(state, action) {
    switch(action.type) {
        case "SET_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "CREATE_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "APPROVE_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "REJECT_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "CANCEL_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "STARTTRIP_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "ENDTRIP_BOOKING": {
            return { ...state, booking: null }
        }
        case "REMOVE_BOOKING": {
            return { ...state, booking: null }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }
        default: {
            return state;
        }
    }
}