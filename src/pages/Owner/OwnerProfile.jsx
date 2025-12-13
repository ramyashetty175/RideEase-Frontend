import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

export default function AdminProfile() {
    const dispatch = useDispatch();
    // const {} = useSelector(() => {

    // })
    const [form, setForm] = useState({
        avatar: '',
        username: '',
        email: '',
        bio: '',
    }) 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                    <h1 className="text-black font-bold text-3xl">Profile</h1>
                    <p className="text-black font-semibold text-lg">View and Edit Profile</p>
                </div>
               <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                   <Avatar className="h-14 w-14">
                       <AvatarImage src="https://github.com/shadcn.png" alt="avatar"/>
                       <AvatarFallback>CN</AvatarFallback>
                   </Avatar>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input id="avatar" type="file" />
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
                <div className="flex flex-col gap-2">
                    <Label htmlFor="insuranceDoc">InsuranceDoc</Label>
                    <Input id="InsuranceDoc" type="file" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="licenceDoc">LicenceDoc</Label>
                    <Input id="licenceDoc" type="file" />
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