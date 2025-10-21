import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Account(props) {
    const { user } = useContext(UserContext);

    if(!user) {
        return <p>loading...</p>
    }

    return(
        <div>
            <h2>Account Component</h2>
            <p>Username - {user.username}</p>
            <p>Email - {user.email}</p>
            <p>Role - {user.role}</p>
        </div>
    )
}