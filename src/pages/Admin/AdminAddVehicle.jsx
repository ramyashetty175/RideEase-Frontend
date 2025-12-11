"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
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
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                   <Checkbox id="toggle-2"
                            defaultChecked
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                   <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                           Enable notifications
                        </p>
                        <p className="text-muted-foreground text-sm">
                           You can enable or disable notifications at any time.
                        </p>
                   </div>
                </Label>
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
                <div className="flex justify-start mt-4 gap-4">
                     <Button type="submit">Submit</Button>
                     <Button variant="outline" type="button">
                        Cancel
                     </Button>
                </div>
            </form>
            </main>
        </SidebarProvider> 
    )
}