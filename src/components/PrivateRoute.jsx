import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function PrivateRoute({ allowedRoles, children }) {
    console.log(allowedRoles);
    const token = localStorage.getItem('token');
    const { user, isLoggedIn } = useContext(UserContext);
    if(token && !isLoggedIn) { // handle page reload || to handle change url in the address bar
       return <p>loading...</p>
    } else if(token && allowedRoles.includes(user.role)) {
       return children;
    } else if(token && !allowedRoles.includes(user.role)) {
       // return <Navigate to="/unauthorized" />
       return <h2>Unauthorized</h2>
    } else {
        return <Navigate to="/login" />
    }
}