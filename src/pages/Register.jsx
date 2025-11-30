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
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/Navbar";

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
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Start your journey with easy and reliable vehicle rentals.
                    </CardDescription>
               </CardHeader>
               <CardContent>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                   <div className="grid gap-2">
                   <Label htmlFor="username">User Name</Label>
                        <Input type="text"
                          name="username"
                          placeholder="Enter Username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                        />
                   </div>
                   <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                       <Input type="email"
                          name="email"
                          placeholder="Enter Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                    </div>
                    <div className="flex gap-4">
                   <div className="grid gap-2">
                   <Label htmlFor="password">Password</Label>
                       <Input type="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Confirm Password</Label>
                        <Input type="password"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                        />
                    </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                       Create Account
                    </Button>
                    <CardDescription>
          Already have an account? <Link to="/login"className="underline">Sign in</Link>
        </CardDescription>
                </CardFooter>
        </Card>
        </div>
        </div>
    )
}