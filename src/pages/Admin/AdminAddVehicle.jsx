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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
               fuelType: '',
               transmission: '',
               seats: '',
               priceperday: '',
               availabilityStatus: '',
               isApproved: ''
         })

         const [files, setFiles] = useState({
               image: null,
               licenceDoc: null,
               insuranceDoc: null,
         })

         const [previewVehicleImage, setPreviewVehicleImage] = useState(null);

         const handleChange = (e) => {
               const key = e.target.name;
               const value = e.target.value;
               setFormData({ ...formdata, [key]: value });
         }
       
         const handleFileChange = (e) => {
               const { name, files } = e.target;
               const file = files[0];
               setFiles((prev) => ({ ...prev, [name]: file }));
               if (name === "image") {
                  setPreviewVehicleImage(URL.createObjectURL(file));
               }
         }

         const uploadVehicleImage = async (file) => {
                  if (!file) {
                     alert("Profile image is not uploaded");
                     return null;
                  }
                  try {
                        const data = new FormData();
                        data.append("vehicle", file);
                        const response = await axios.post(`/api/upload/vehicle/${id}`, data, { headers: { Authorization: localStorage.getItem("token")}});
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
                        const response = await axios.post(`/api/upload/vehicle/licence/${id}`, data, { headers: { Authorization: localStorage.getItem("token")}});
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
                       const res = await axios.post(`/api/upload/vehicle/insurance/${id}`, data, { headers: { Authorization: localStorage.getItem("token")}});
                       return res.data.insuranceDoc;
                  } catch (err) {
                       console.log("Insurance upload failed:", err);
                  }
         }

                  useEffect(() => {
  if (editId && data) {
    setFormData({
      vehicleName: data.vehicleName || "",
      brand: data.brand || "",
      type: data.type || "",
      owner: data.owner || "",
      registrationNumber: data.registrationNumber || "",
      fuelType: data.fuelType || "",
      transmission: data.transmission || "",
      seats: data.seats || "",
      priceperday: data.pricePerDay || "",
      availabilityStatus: data.availabilityStatus || "",
      isApproved: data.isApproved || "",
    });

    setPreviewVehicleImage(data.image || null);
  }
}, [editId, data]);
       
    const handleSubmit = async (e) => {
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
        const uploads = await Promise.all([
                  files.avatar ? uploadAvatar(files.image) : null,
                  files.licenceDoc ? uploadLicence(files.licenceDoc) : null,
                  files.insuranceDoc ? uploadInsurance(files.insuranceDoc) : null,
              ]);
              const [imageUrl, licenceUrl, insuranceUrl] = uploads;
               const payload = {
  ...formdata,
  image: imageUrl || formdata.image,
  licenceDoc: licenceUrl || formdata.licenceDoc,
  insuranceDoc: insuranceUrl || formdata.insuranceDoc
};

              if (imageUrl) payload.image = imageUrl;
              if (licenceUrl) payload.licenceDoc = licenceUrl;
              if (insuranceUrl) payload.insuranceDoc = insuranceUrl;
      //   if(editId) {
      //       dispatch(updateVehicle({ editId, formdata, resetFormData }));
      //   } else {
      //       dispatch(createVehicle({ formdata, resetForm }));
      //   }
      if(editId) {
    dispatch(updateVehicle({ editId, formData: payload, handleReset: resetFormData }));
} else {
    dispatch(createVehicle({ formData: payload, handleReset: resetFormData }));
}

    }

    return(
        <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full">
            <h2>{ editId ? 'Edit' : 'Add' } Vehicle</h2>
            { errors && <p>{ errors }</p>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-6">
                 <div className="col-span-4 flex flex-col gap-6">
                      {previewVehicleImage && (
  <img
    src={previewVehicleImage}
    alt="vehicle"
    className="w-40 h-24 object-cover rounded-md border"
  />
)}


                     <div className="flex flex-col gap-2">
                <Label htmlFor="image">Vehicle Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="licenceDoc">LicenceDoc</Label>
                    <div className="flex items-center gap-3 w-full">
                    <Input id="licenceDoc" name="licenceDoc" type="file" onChange={handleFileChange}/>
                        { files.licenceDoc ? (
                        <span className="text-gray-500 truncate max-w-xs">{files.licenceDoc.name}</span>
                        ) : formdata.licenceDoc ? (
                        <a
                          href={formdata.licenceDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={formdata.licenceDoc.split("/").pop()}
                        >
                          {formdata.licenceDoc.split("/").pop()}
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
                        ) : formdata.insuranceDoc ? (
                        <a
                          href={formdata.insuranceDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={formdata.insuranceDoc.split("/").pop()}
                        >
                          {formdata.insuranceDoc.split("/").pop()}
                        </a>
                        ) : null}
                    </div>
                </div>
                 </div>
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