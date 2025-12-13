import { InfoIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Profile() {
    const dispatch = useDispatch();
    // const {} = useSelector(() => {
    
    // })
    const [form, setForm] = useState({
        avatar: '',
        username: '',
        email: '',
        role: '',
        bio: '',
        insuranceDoc: '',
        licenceDoc: ''
    }) 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            username,
            email,
            role,
            bio,
            avatar,
            insuranceDoc,
            licenceDoc
        }
        console.log(form);
    }
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }
    
    return(
        <div>
        <h1>Profile</h1>
        <p>view and Edit Profile</p>
        <SidebarProvider>
           <AppSidebar />
            <main className="p-4">
                <div className="flex flex-row flex-wrap items-center gap-12">
                    <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="picture">Avatar</Label>
                    <Input id="picture" type="file" />
                </div>
               <form onSubmit={handleSubmit}>

                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="username" className="text-foreground">
                       UserName
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
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="insuranceDoc" className="text-foreground">
                       InsuranceDoc
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
                <InputGroupInput id="insuranceDoc" 
                        name="insuranceDoc"
                        value={form.insuranceDoc}
                        placeholder="Enter InsuranceDoc"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="licenceDoc" className="text-foreground">
                       LicenceDoc
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
                <InputGroupInput id="licenceDoc" 
                        name="licenceDoc"
                        value={form.licenceDoc}
                        placeholder="Enter LicenceDoc"
                        onChange={handleChange}
                />
                </InputGroup>
               </form>
           </main>
       </SidebarProvider>
        </div>
    )
}