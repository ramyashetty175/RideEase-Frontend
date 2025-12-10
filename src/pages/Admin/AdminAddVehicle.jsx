import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle, updateVehicle } from "../../slices/vehicleSlice";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export default function AdminAddVehicle() {
    const dispatch = useDispatch();
    const { errors, data, editId } = useSelector((state) => {
        return state.vehicle;
    })

    const [formdata, setFormData] = useState({
        vehicleName: '',
        brand: '',
        type: '',
        owner: '',
        registrationNumber: '',
        licenceDoc: '',
        fuelType: '',
        transmission: '',
        seats: '',
        priceperday: '',
        availabilityStatus: '',
        isApproved: ''
    });

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({ ...form, [key]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const resetFormData = () => {
            setFormData({
               vehicleName: '',
               brand: '',
               type: '',
               owner: '',
               registrationNumber: '',
               licenceDoc: '',
               fuelType: '',
               transmission: '',
               seats: '',
               priceperday: '',
               availabilityStatus: '',
               isApproved: ''
            })
        }
        if(editId) {
            dispatch(updateVehicle({ editId, formdata, resetFormData }));
        } else {
            dispatch(createVehicle({ formdata, resetForm }));
        }
    }
    // useEffect(() => {
    //     if(editId) {

    //     } else {

    //     }
    // }, [editId])

    return(
        <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full">
            <h2>{ editId ? 'Edit' : 'Add' } Vehicle</h2>
            { errors && <p>{ errors }</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 flex flex-col gap-6">
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
                     Vehicle Name
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
                <NativeSelect>
                    <NativeSelectOption value="">Select Owner</NativeSelectOption>
                    <NativeSelectOption value="1">Owner 1</NativeSelectOption>
                </NativeSelect>
                <NativeSelect>
                    <NativeSelectOption value="">Select FuelType</NativeSelectOption>
                    <NativeSelectOption value="car">Petrol</NativeSelectOption>
                    <NativeSelectOption value="bike">Diesel</NativeSelectOption>
                    <NativeSelectOption value="bike">Electric</NativeSelectOption>
                </NativeSelect>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
                     Price Per Day
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
                </div>

                <div className="col-span-4 flex flex-col gap-6">
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="Brand" className="text-foreground">
                     Brand
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
                <InputGroupInput id="brand" 
                        name="vehicleName"
                        value={formdata.brand}
                        placeholder="Enter brand"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
                     Registration Number
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
                <NativeSelect>
                    <NativeSelectOption value="">Select Transmission</NativeSelectOption>
                    <NativeSelectOption value="car">Manual</NativeSelectOption>
                    <NativeSelectOption value="bike">Electric</NativeSelectOption>
                </NativeSelect>
                <NativeSelect>
                    <NativeSelectOption value="">Availability Status</NativeSelectOption>
                    <NativeSelectOption value="car">Available</NativeSelectOption>
                    <NativeSelectOption value="bike">Booked</NativeSelectOption>
                    <NativeSelectOption value="bike">Maintainance</NativeSelectOption>
                    <NativeSelectOption value="bike">unAvailable</NativeSelectOption>
                </NativeSelect>
                </div>

                <div className="col-span-4 flex flex-col gap-15">
                <NativeSelect>
                    <NativeSelectOption value="">Select Type</NativeSelectOption>
                    <NativeSelectOption value="car">Car</NativeSelectOption>
                    <NativeSelectOption value="bike">Bike</NativeSelectOption>
                </NativeSelect>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="VehicleName" className="text-foreground">
                     Licence
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
                     Seats
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
                </div>
                </div>
            </form>
            </main>
        </SidebarProvider> 
    )
}