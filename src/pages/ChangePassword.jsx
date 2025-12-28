import { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            oldpassword: form.oldpassword,
            newpassword: form.newpassword,
            confirmnewpassword: form.confirmnewpassword
        }
        console.log(formData);
        try {
            const response = await axios.put(`/users/password/${user._id}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
            console.log(response.data);
            setForm({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
            alert('update updated');
        } catch(err) {
            console.log(err);
            alert('update failed');
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
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5">
                   <Label htmlFor="oldpassword">Old Password</Label>
                        <Input type="password"
                          name="oldpassword"
                          placeholder="Enter Old Password"
                          value={form.oldpassword}
                          onChange={handleChange}
                        />
                </div>
                <div className="grid gap-5">
                   <Label htmlFor="password">New Password</Label>
                        <Input type="password"
                          name="newpassword"
                          placeholder="Enter New Password"
                          value={form.newpassword}
                          onChange={handleChange}
                        />
                </div>
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