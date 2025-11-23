import { useReducer, useEffect } from "react";
import axios from "../../config/axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const userReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": {
            return { ...state, isLoggedIn: true, user: action.payload, serverErrorMsg: '' }
        }
        case "LOGOUT": {
            return { ...state, isLoggedIn: false, user: null }
        }
        case "SET_SERVER_ERROR": {
            return { ...state, serverErrorMsg: action.payload }
        }
        default: {
            return { ...state }
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
    
    useEffect(() => {
        if(localStorage.getItem('token')) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/users/account', { headers: { Authorization: localStorage.getItem('token') }})
                    dispatch({ type: "LOGIN", payload: response.data });
                } catch(err) {
                    console.log(err);
                }
            }
            fetchUser()
        }
    }, [])

    const handleRegister = async (formData, resetForm) => {
        try {
            const response = await axios.post('/users/register', formData)
            console.log(response.data);
            resetForm();
            alert('registered successfully');
            dispatch({ type: 'SET_SERVER_ERROR', payload: '' });
            navigate('/login');
        } catch(err) {
            console.log(err);
            dispatch({ type: 'SET_SERVER_ERROR', payload: err.response.data.msg });
        }
    }

    const handleLogin = async (formData, resetForm) => {
        try {
            const response = await axios.post('/users/login', formData)
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            const userResponse = await axios.get('/users/account', { headers: { Authorization: localStorage.getItem('token') }})
            resetForm();
            alert('logged in successfully');
            dispatch({ type: "LOGIN", payload: userResponse.data });
            navigate('/dashboard');
        } catch(err) {
            console.log(err);
            dispatch({ type: 'SET_SERVER_ERROR', payload: err.response.data.error });
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
    }

    return(
        <UserContext.Provider value={{ ...state, handleRegister, handleLogin, handleLogout }}>
            {props.children}
        </UserContext.Provider>
    )
}
