import { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import UserContext from "../context/UserContext";
import axios from "../config/axios";

export default function ChangePassword() {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: ''
    }); 
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isUnChanged = form.password === user.password && form.confirmnewpassword === user.confirmnewpassword;
        if(isUnChanged) {
            window.alert("No changes to update");
        }
        const errors = {};
        if(form.oldpassword.length == 0) {
            errors.oldpassword = "Old Password is required";
        }
        if(form.newpassword.length == 0) {
            errors.newpassword = "New Password is required";
        }
        if(form.confirmnewpassword.length == 0) {
            errors.confirmnewpassword = "Confirm Password is required";
        }
        if(Object.keys(errors).length > 0) {
           setErrors(errors);
        }
        const formData = {
            oldpassword: form.oldpassword,
            newpassword: form.newpassword,
            confirmnewpassword: form.confirmnewpassword
        }
        console.log(formData);
        try {
            if(isUnChanged) {
            const response = await axios.put(`/users/password/${user._id}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
            console.log(response.data);
            setForm({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
            setErrors({});
            setAlert({ type: "success", message: "Password updated!" });
            setTimeout(() => setAlert(null), 3000);
            }
        } catch(err) {
            console.log(err);
            setAlert({ type: "error", message: "Password update failed" });
            setTimeout(() => setAlert(null), 3000);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    return(
        <div>
            <SidebarProvider>
           <AppSidebar />
           <main className="p-4">
            <div className="text-left pl-2 mb-6">
                <h1 className="text-black font-bold text-3xl">Change Your Password</h1>
            </div>
            {alert && (
  <Alert
    variant={alert.type === "error" ? "destructive" : "default"}
    className="mb-4 flex items-start gap-2"
  >
    {alert.type === "error" ? (
      <AlertCircleIcon />
    ) : (
      <CheckCircle2Icon />
    )}
    <AlertTitle>
      {alert.message}
</AlertTitle>
  </Alert>
)}
            <form onSubmit={handleSubmit} className="space-y-6">
                {errors.oldpassword && (
        <span style={{ color: "red" }}>{errors.oldpassword}</span>
  )}
                <div className="grid gap-5">
                   <Label htmlFor="oldpassword">Old Password</Label>
                        <Input type="password"
                          name="oldpassword"
                          placeholder="Enter Old Password"
                          value={form.oldpassword}
                          onChange={handleChange}
                        />
                </div>
                {errors.newpassword && (
        <span style={{ color: "red" }}>{errors.newpassword}</span>
  )}
                <div className="grid gap-5">
                   <Label htmlFor="password">New Password</Label>
                        <Input type="password"
                          name="newpassword"
                          placeholder="Enter New Password"
                          value={form.newpassword}
                          onChange={handleChange}
                        />
                </div>
                {errors.confirmnewpassword && (
        <span style={{ color: "red" }}>{errors.confirmnewpassword}</span>
  )}
                <div className="grid gap-5">
                   <Label htmlFor="password">Confirm New Password</Label>
                        <Input type="password"
                          name="confirmnewpassword"
                          placeholder="Confirm New Password"
                          value={form.confirmnewpassword}
                          onChange={handleChange}
                        />
                   </div>
                <div className="text-left">
                    <Button>Save Password</Button>
                </div>
            </form>
            </main>
            </SidebarProvider>
        </div>
    )
}