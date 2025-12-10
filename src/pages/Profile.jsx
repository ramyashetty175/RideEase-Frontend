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
import { useDispatch, useSelector } from "react-redux"

export default function Profile() {
    const dispatch = useDispatch();
    const {} = useSelector(() => {
    
    })
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
        console.log(formData);
    }
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    }
    
    return(
        <div>
        <h2>Admin Profile Page</h2>
        <SidebarProvider>
           <AppSidebar />
           <main className="p-4">
               <form onSubmit={handleSubmit}>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
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
                <InputGroupInput id="vehicleName" 
                        name="vehicleName"
                        value={formdata.vehicleName}
                        placeholder="Enter vehicleName"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
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
                <InputGroupInput id="vehicleName" 
                        name="vehicleName"
                        value={formdata.vehicleName}
                        placeholder="Enter vehicleName"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
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
                <InputGroupInput id="vehicleName" 
                        name="vehicleName"
                        value={formdata.vehicleName}
                        placeholder="Enter vehicleName"
                        onChange={handleChange}
                />
                </InputGroup>
               </form>
           </main>
       </SidebarProvider>
        </div>
    )
}