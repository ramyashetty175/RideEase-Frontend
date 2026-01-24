export default function ownerReducer(state, action) {
    switch(action.type) {
        case "SET_OWNER": {
            return { ...state, owner: action.payload }
        }
        case "APPROVE_OWNER": {
            return { ...state, owner: action.payload }
        }
        case "REJECT_OWNER": {
            return { ...state, owner: action.payload }
        }
        case "REMOVE_OWNER": {
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