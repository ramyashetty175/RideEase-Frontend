import { useContext, useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
           oldpassword: '',
           newpassword: '',
           confirmnewpassword: ''
        }
        console.log(formData);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    return(
        <div>
            <h2>Change Your Password</h2>
            <SidebarProvider>
           <AppSidebar />
           <main className="p-4">
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