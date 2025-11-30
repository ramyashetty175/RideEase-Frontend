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
import { Navbar } from "@/components/ui/Navbar";

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
        <Navbar/>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  Login with your Email and Password
                </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label> 
                <Input type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center"></div>
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
                <Input  type="password"
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
        <CardDescription>
          Don't have an account? <Link to="/register"className="underline">Sign up</Link>
        </CardDescription>
        </Card>
        </div>
        </div>
    )
}