import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Register() {
    const { handleRegister } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
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
                   <label>Full Name</label><br />
                   <input type="text"
                          name="username"
                          placeholder="Enter Username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                    />
                </div>
                <div>
                   <label>Email</label><br />
                   <input type="email"
                          name="email"
                          placeholder="Enter Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                   />
                </div>
                <div>
                   <label>Password</label><br />
                   <input type="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                   />
                </div>
                <div>
                    <label>Confirm Password</label><br />
                    <input type="password"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Create Account"/>
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
    )
}