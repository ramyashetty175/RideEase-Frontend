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
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                       Login
                    </Button>
                    <CardAction>
                       <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardFooter>
        </Card>
    )
}


// export default function Register() {
//   const { handleRegister } = useContext(UserContext);

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     onSubmit: (values, { resetForm }) => {
//       console.log(values);
//       handleRegister(values, resetForm);
//     },
//   });

//   return (
//     <Card className="w-full max-w-sm mx-auto mt-10">
//       <CardHeader>
//         <CardTitle>Create your account</CardTitle>
//         <CardDescription>
//           Fill in the details below to register
//         </CardDescription>
//         <CardAction>
//           <Link to="/login">
//             <Button variant="link">Sign in</Button>
//           </Link>
//         </CardAction>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="username">Full Name</Label>
//             <Input
//               id="username"
//               name="username"
//               placeholder="Enter username"
//               value={formik.values.username}
//               onChange={formik.handleChange}
//               required
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               required
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               required
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm password"
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               required
//             />
//           </div>
//         </form>
//       </CardContent>

//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full" onClick={formik.handleSubmit}>
//           Create Account
//         </Button>
//         <Button variant="outline" className="w-full">
//           Sign up with Google
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }