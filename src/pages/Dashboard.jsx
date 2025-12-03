import { useContext } from "react"
import UserContext from "../context/UserContext";
import AdminDashboard from "../pages/admin/AdminDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import UserDashboard from "../pages/UserDashbaord";
import { useNavigate } from "react-router-dom";

export default function Dashboard(props) {
    const { user } = useContext(UserContext);
  
    if(!user) {
        return <p>loading...</p>
    }

    // return(
    //     <div>
    //         <h2>Dasboard Component</h2>
    //         <p>Welcome, {user.username}</p>
    //     </div>
    // )
    switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "user":
      return <UserDashboard />;
    case "owner":
      return <OwnerDashboard />;
    default:
      return <div>Role not recognized</div>;
  }
}