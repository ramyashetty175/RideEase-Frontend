import { useFormik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Login() {
    const { handleLogin } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
           email: "",
           password: ""
        }, 
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            handleLogin(values, resetForm);
        }
    })

    return(
        <div>
            <h2>Login with us!</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <label>Email</label> <br />
                <input type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                />
                </div>
                <div>
                <label>Password</label><Link to="/forgotpassword">forgotpassword</Link> <br />
                <input  type="password"
                        id="password"
                        placeholder="Enter Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                />
                </div>
                <div>
                  <input type="submit" value="Login" />
                </div>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    )
}
