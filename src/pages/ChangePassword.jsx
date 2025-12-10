import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ChangePassword() {
    const [state, setState] = useState({
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
        setForm({ ...state, [e.target.name] : e.target.value });
    }

    return(
        <div>
            <h2>Change Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                   <Label htmlFor="username">Old Password</Label>
                        <Input type="password"
                          name="password"
                          placeholder="enter old password"
                          value={state.oldpassword}
                          onChange={handleChange}
                        />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="username">New Password</Label>
                        <Input type="password"
                          name="password"
                          placeholder="enter new password"
                          value={state.newpassword}
                          onChange={handleChange}
                        />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="username">Confirm New Password</Label>
                        <Input type="password"
                          name="password"
                          placeholder="confirm new password"
                          value={state.confirmnewpassword}
                          onChange={handleChange}
                        />
                   </div>
                <div>
                    <Button>Submit</Button>
                </div>
            </form>
        </div>
    )
}