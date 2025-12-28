import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { InfoIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import axios from "@/config/axios";

export default function AdminProfile() {
    const { user, dispatch } = useContext(UserContext);
    const [form, setForm] = useState({
        username: '',
        email: '',
        bio: ''
    }) 

    const [avatarFile, setAvatarFile] = useState(null);

    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            setForm({
               username: user.username,
               email: user.email,
               bio: user.bio
            })
        setPreviewAvatar(user.avatar);
        setAvatarFile(null);
        }
    }, [user])

    if (!user) {
        return <p>Loading profile...</p>;
    }
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (name === "avatar") {
            setAvatarFile(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
    }
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }
    
    const uploadAvatar = async (file) => {
        if (!file) {
            alert("Profile image is not uploaded");
            return null;
        }
        try {
            const data = new FormData();
            data.append("avatar", file);
            const response = await axios.post('/api/upload/avatar', data, { headers: { Authorization: localStorage.getItem("token")}});
            return response.data.avatarUrl;
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let avatarUrl = avatarFile ? await uploadAvatar(avatarFile) : null;
        const payload = {
            username: form.username,
            bio: form.bio
        }
        if (avatarUrl) payload.avatar = avatarUrl;
        try {
            const response = await axios.put('/users/profile', payload, { headers: { Authorization: localStorage.getItem('token')}});
            console.log(response.data);
            dispatch({ type: "SET_USER", payload: response.data });
            alert("Profile updated successfully");
        } catch(err) {
            console.log(err);
            alert("Profile update failed");
        }
    }

    return(
        <div>
        <SidebarProvider>
           <AppSidebar />
           <main className="p-4">
               <div className="text-left pl-2 mb-6">
                    <h1 className="text-black font-bold text-3xl">Profile</h1>
                    <p className="text-black font-semibold text-lg">View and Edit Profile</p>
                </div>
               <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="h-14 w-14">
                    {previewAvatar ? (
                      <AvatarImage src={previewAvatar} alt="avatar" />
                    ) : (
                      <AvatarFallback>CN</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="username" className="text-foreground">
                     User Name
                   </Label>
                <Tooltip>
                   <TooltipTrigger asChild>
                   <InputGroupButton
                       variant="ghost"
                       aria-label="Help"
                       className="ml-auto rounded-full"
                       size="icon-xs"
                    >
                    <InfoIcon />
                    </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                       <p>We&apos;ll use this to send you notifications</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
                <InputGroupInput id="username" 
                        name="username"
                        value={form.username}
                        placeholder="Enter User Name"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="email" className="text-foreground">
                     Email
                   </Label>
                <Tooltip>
                   <TooltipTrigger asChild>
                   <InputGroupButton
                       variant="ghost"
                       aria-label="Help"
                       className="ml-auto rounded-full"
                       size="icon-xs"
                    >
                    <InfoIcon />
                    </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                       <p>We&apos;ll use this to send you notifications</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
                <InputGroupInput id="email" 
                        name="email"
                        value={form.email}
                        placeholder="Enter Email"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="bio" className="text-foreground">
                     Bio
                   </Label>
                <Tooltip>
                   <TooltipTrigger asChild>
                   <InputGroupButton
                       variant="ghost"
                       aria-label="Help"
                       className="ml-auto rounded-full"
                       size="icon-xs"
                    >
                    <InfoIcon />
                    </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                       <p>We&apos;ll use this to send you notifications</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
                <InputGroupInput id="bio" 
                        name="bio"
                        value={form.bio}
                        placeholder="Enter Bio"
                        onChange={handleChange}
                />
                </InputGroup>
                <div className="text-left">
                    <Button>Save Profile</Button>
                </div>
               </form>
           </main>
       </SidebarProvider>
        </div>
    )
}