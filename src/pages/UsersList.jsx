import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "../config/axios";

export default function Users() {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await axios.get('/users', { headers: { Authorization: localStorage.getItem('token') } })
                setUsers(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUsersList();
    }, [])

        if(!user) {
            return <p>loading...</p>
        }
    
        const handleRemove = async (id, email) => {
            const userConfirm = window.confirm("Are you sure?");
            if(userConfirm) {
                const userEmail = window.prompt("Enter email of your user");
                if(userEmail == email) {
                   try {
                    const response = await axios.delete(`/users/${id}`, { headers: { Authorization: localStorage.getItem('token')}})
                    const newArr = users.filter(ele => ele._id != response.data._id);
                    setUsers(newArr);
                } catch(err) {
                    console.log(err);
                }
                } else {
                    alert("Email is incorrect");
                }
            }
        }
    
    return(
        <div>
            <h2>Users List</h2>
            <table border="2">
               <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                   { users.map((ele) => (
                      <tr key={ele._id}>
                        <td>{ele.username}</td>
                        <td>{ele.email}</td>
                        <td>{ele.role}</td>
                      </tr>                      
                   ))}
               </tbody>
            </table>
        </div>
    )
}
