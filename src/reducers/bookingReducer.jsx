export default function bookingSlice(action, state) {
    switch(action.type) {
        case "SET_BOOKING": {
            return { ...state, booking: action.payload }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }
        default: {
            return state;
        }
    }
}