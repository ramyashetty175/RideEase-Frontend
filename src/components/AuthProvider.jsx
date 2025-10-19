import { useReducer } from "react";
import axios from "../config/axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const userReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": {
            return { ...state, isLoggedIn: true, user: action.payload, serverErrorMsg: '' }
        }
        case "LOGOUT": {
            return { ...state, user: null }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrorMsg: action.payload }
        }
    }
}

export default function AuthProvider(props) {
    const navigate = useNavigate();
    const [state, dispatch]= useReducer(userReducer, {
        user: null,
        isLoggedIn: false,
        serverErrorMsg: ''
    })

    const handleRegister = async (formData, resetForm) => {
        try {
            const response = await axios.post('/users/register', formData)
            console.log(response.data);
        } catch(err) {
            console.log(err);
            dispatch({ type: 'SET_SERVER_ERROR', payload: err.message });
        }
    }

    const handleLogin = () => {

    }

    return(
        <UserContext.Provider value={{ ...state, handleRegister }}>
            {props.children}
        </UserContext.Provider>
    )
}