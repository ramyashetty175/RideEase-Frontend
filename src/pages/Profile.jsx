import { InfoIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "@/config/axios";

export default function Profile() {
        const { user, dispatch } = useContext(UserContext);

        const [form, setForm] = useState({
            username: "",
            email: "",
            bio: "",
        });

        const [files, setFiles] = useState({
            avatar: null,
            licenceDoc: null,
            insuranceDoc: null,
        });

        const [previewAvatar, setPreviewAvatar] = useState(null);

        useEffect(() => {
          if (user) {
            setForm({ 
              username: user.username, 
              email: user.email, 
              bio: user.bio });
            setPreviewAvatar(user.avatar);
            setFiles({ 
              avatar: null, 
              licenceDoc: null, 
              insuranceDoc: null });
            }
        }, [user]);

        if (!user) {
          return <p>Loading profile...</p>;
        }

        const handleFileChange = (e) => {
          const { name, files: selectedFiles } = e.target;
          const file = selectedFiles[0];
          setFiles((prev) => ({ ...prev, [name]: file }));
          if (name === "avatar") {
              setPreviewAvatar(URL.createObjectURL(file));
          }
        };

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
              console.log("Avatar upload failed:", err);
          }
        }

        const uploadLicence = async (file) => {
          if (!file) {
              alert("Licence is not uploaded");
              return null;
          }
          try {
              const data = new FormData();
              data.append("licenceDoc", file);
              const response = await axios.post('/api/upload/licence', data, { headers: { Authorization: localStorage.getItem("token")}});
              return response.data.licenceDoc;
          } catch (err) {
              console.log("Licence upload failed:", err);
          }
        }

        const uploadInsurance = async (file) => {
          if (!file) {
              alert("Insurance is not uploaded");
              return null;
          }
          try {
              const data = new FormData();
              data.append("insuranceDoc", file);
              const res = await axios.post('/api/upload/insurance', data, { headers: { Authorization: localStorage.getItem("token")}});
              return res.data.insuranceDoc;
          } catch (err) {
              console.log("Insurance upload failed:", err);
          }
        };

        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const uploads = await Promise.all([
                  files.avatar ? uploadAvatar(files.avatar) : null,
                  files.licenceDoc ? uploadLicence(files.licenceDoc) : null,
                  files.insuranceDoc ? uploadInsurance(files.insuranceDoc) : null,
              ]);
              const [avatarUrl, licenceUrl, insuranceUrl] = uploads;
              const payload = {
                  username: form.username,
                  bio: form.bio
              }
              if (avatarUrl) payload.avatar = avatarUrl;
              if (licenceUrl) payload.licenceDoc = licenceUrl;
              if (insuranceUrl) payload.insuranceDoc = insuranceUrl;
              const response = await axios.put('/users/profile', payload, { headers: { Authorization: localStorage.getItem("token")}});
              dispatch({ type: "SET_USER", payload: response.data });
              alert("Profile updated successfully");
          } catch (err) {
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
                        placeholder="Enter username"
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
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="licenceDoc">LicenceDoc</Label>
                    <div className="flex items-center gap-3 w-full">
                    <Input id="licenceDoc" name="licenceDoc" type="file" onChange={handleFileChange}/>
                        { files.licenceDoc ? (
                        <span className="text-gray-500 truncate max-w-xs">{files.licenceDoc.name}</span>
                        ) : user.licenceDoc ? (
                        <a
                          href={user.licenceDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={user.licenceDoc.split("/").pop()}
                        >
                          {user.licenceDoc.split("/").pop()}
                        </a>
                        ) : null}
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="insuranceDoc">InsuranceDoc</Label>
                    <div className="flex items-center gap-3 w-full">
                    <Input id="insuranceDoc" name="insuranceDoc" type="file" onChange={handleFileChange}/>
                        { files.insuranceDoc ? (
                        <span className="text-gray-500 truncate max-w-xs">{files.insuranceDoc.name}</span>
                        ) : user.insuranceDoc ? (
                        <a
                          href={user.insuranceDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={user.insuranceDoc.split("/").pop()}
                        >
                          {user.insuranceDoc.split("/").pop()}
                        </a>
                        ) : null}
                    </div>
                </div>
                <div className="text-left">
                    <Button>Save Profile</Button>
                </div>
               </form>
           </main>
        </SidebarProvider>
        </div>
    )
}