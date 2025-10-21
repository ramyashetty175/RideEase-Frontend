import { useContext } from "react"
import UserContext from "../context/UserContext";

export default function Dashboard(props) {
    const { user } = useContext(UserContext);
  
    if(!user) {
        return <p>loading...</p>
    }

    return(
        <div>
            <h2>Dasboard Component</h2>
            <p>Welcome, {user.username}</p>
        </div>
    )
}
