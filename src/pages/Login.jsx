import { Button } from "@/components/ui/button"
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
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
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
                <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        </CardFooter>
            </form>
            </CardContent>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </Card>
    )
}
