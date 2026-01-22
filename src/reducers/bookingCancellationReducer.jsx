export default function bookingCancellationReducer(state, action) {
    switch(action.type) {
        case "SET_CANCELLATIONS": {
            return { ...state, cancellations: action.payload }
        }
        case "REQUEST_CANCEL": {
            return { ...state, cancellations: [...state.cancellations, action.payload] }
        }
        case "APPROVE_CANCEL": {
            return {
                ...state,
                cancellations: state.cancellations.map(ele =>
                    ele._id === action.payload._id ? action.payload : ele
                )
            }
        }
        case "REJECT_CANCEL": {
            return {
                ...state,
                cancellations: state.cancellations.map(ele =>
                    ele._id === action.payload._id ? action.payload : ele
                )
            }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrMsg: action.payload }
        }

        default: {
            return { ...state }
        }
    }
}
