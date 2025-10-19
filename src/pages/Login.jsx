import { useFormik } from "formik";

export default function Login() {
    const formik = useFormik({
        initialValues: {
           username: "",
           email: "",
           password: ""
        }, 
        onSubmit: (values, {resetForm}) => {
            console.log(values);
            handleLogin();
        }
    })

    return(
        <div>
            <h2>Login with us!</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <input type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                />
                </div>
                <div>
                <input  type="password"
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
