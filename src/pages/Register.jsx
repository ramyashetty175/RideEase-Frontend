import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Register() {
    const { handleRegister } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit:(values, {resetForm}) => {
            console.log(values);
            handleRegister(values, resetForm);
        }
    })
    return(
        <div>
            <h2>Register with us!</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                   <input type="text"
                          id="username"
                          placeholder="Enter Username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                    />
                </div>
                <div>
                   <input type="email"
                          id="email"
                          placeholder="Enter Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                   />
                </div>
                <div>
                   <input type="password"
                          id="password"
                          placeholder="Enter Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                   />
                </div>
                <div>
                    <input type="Submit" />
                </div>
            </form>
        </div>
    )
}