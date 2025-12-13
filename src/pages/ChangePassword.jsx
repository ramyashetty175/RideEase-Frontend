import { useContext, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import UserContext from "../context/UserContext";

export default function ChangePassword() {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: ''
    }); 

    useEffect(() => {
        if(user) {
            setForm({
                ...form,
                oldpassword: user.oldpassword,
                newpassword: user.newpassword,
                confirmnewpassword: user.confirmnewpassword
            })
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
            const response = await axios.put(`/users/password/${id}`, form, { headers: localStorage.getItem('token')});
            console.log(response);
            setForm([]);
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
                <div className="grid gap-2">
                   <Label htmlFor="oldpassword">Old Password</Label>
                        <Input type="password"
                          name="oldpassword"
                          placeholder="Enter Old Password"
                          value={form.oldpassword}
                          onChange={handleChange}
                        />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="password">New Password</Label>
                        <Input type="password"
                          name="newpassword"
                          placeholder="Enter New Password"
                          value={form.newpassword}
                          onChange={handleChange}
                        />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="password">Confirm New Password</Label>
                        <Input type="password"
                          name="confirmnewpassword"
                          placeholder="Confirm New Password"
                          value={form.confirmnewpassword}
                          onChange={handleChange}
                        />
                   </div>
                <div className="text-left">
                    <Button>Submit</Button>
                </div>
            </form>
            </main>
            </SidebarProvider>
        </div>
    )
}