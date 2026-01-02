// "use client"

// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"
// import {
//   NativeSelect,
//   NativeSelectOption,
// } from "@/components/ui/native-select"
// import { InfoIcon } from "lucide-react"
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
//   InputGroupInput,
// } from "@/components/ui/input-group"
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createVehicle, updateVehicle } from "../../slices/vehicleSlice";
// import { SidebarProvider } from "../../components/ui/sidebar";
// import { AppSidebar } from "../../components/app-sidebar";
// import axios from "../../config/axios";

// export default function OwnerAddVehicle() {
//          const dispatch = useDispatch();

//          const { errors, data, editId } = useSelector((state) => {
//                return state.vehicle;
//          })

//          const [formdata, setFormData] = useState({
//                vehicleName: '',
//                brand: '',
//                type: '',
//                owner: '',
//                registrationNumber: '',
//                licenceDoc: '',
//                insuranceDoc: '',
//                fuelType: '',
//                transmission: '',
//                seats: '',
//                pricePerDay: '',
//                image: '',
//                availabilityStatus: '',
//                isApproved: ''
//          })

//          const [files, setFiles] = useState({
//                image: null,
//                licenceDoc: null,
//                insuranceDoc: null
//          })

//          const [previewVehicleImage, setPreviewVehicleImage] = useState(null);

//          const handleChange = (e) => {
//                const key = e.target.name;
//                const value = e.target.value;
//                setFormData({ ...formdata, [key]: value });
//          }
       
//          const handleFileChange = (e) => {
//                const { name, files } = e.target;
//                const file = files[0];
//                setFiles((prev) => ({ ...prev, [name]: file }));
//                if (name === "image") {
//                   setPreviewVehicleImage(URL.createObjectURL(file));
//                }
//          }

//          const uploadVehicleImage = async (file) => {
//                   if (!file) {
//                      alert("Profile image is not uploaded");
//                      return null;
//                   }
//                   try {
//                         const data = new FormData();
//                         data.append("image", file);
//                         const response = await axios.post(`/api/upload/vehicle/${editId}`, data, { headers: { Authorization: localStorage.getItem("token")}});
//                         return response.data.image;
//                   } catch (err) {
//                         console.log("Avatar upload failed:", err);
//                   }
//          }
       
//          const uploadLicence = async (file) => {
//                   if (!file) {
//                      alert("Licence is not uploaded");
//                      return null;
//                   }
//                   try {
//                         const data = new FormData();
//                         data.append("licenceDoc", file);
//                         const response = await axios.post(`/api/upload/vehicle/licence/${editId}`, data, { headers: { Authorization: localStorage.getItem("token")}});
//                         return response.data.licenceDoc;
//                   } catch (err) {
//                         console.log("Licence upload failed:", err);
//                   }
//          }
       
//          const uploadInsurance = async (file) => {
//                   if (!file) {
//                      alert("Insurance is not uploaded");
//                      return null;
//                   }
//                   try {
//                        const data = new FormData();
//                        data.append("insuranceDoc", file);
//                        const res = await axios.post(`/api/upload/vehicle/insurance/${editId}`, data, { headers: { Authorization: localStorage.getItem("token")}});
//                        return res.data.insuranceDoc;
//                   } catch (err) {
//                        console.log("Insurance upload failed:", err);
//                   }
//          }

//          useEffect(() => {
//                if (editId && data) {
//                      setFormData({
//                            vehicleName: data.vehicleName || "",
//                            brand: data.brand || "",
//                            type: data.type || "",
//                            owner: data.owner || "",
//                            registrationNumber: data.registrationNumber || "",
//                            licenceDoc: data.licenceDoc || "",
//                            insuranceDoc: data.insuranceDoc || "",
//                            fuelType: data.fuelType || "",
//                            transmission: data.transmission || "",
//                            seats: data.seats || "",
//                            pricePerDay: data.pricePerDay || "",
//                            image: '',
//                            availabilityStatus: data.availabilityStatus || "",
//                            isApproved: data.isApproved || "",
//                      })
//                            setPreviewVehicleImage(data.image || null);
//                }
//          }, [editId, data])
         
//          const handleSubmit = async (e) => {
//                   e.preventDefault();
//                   const resetFormData = () => {
//                         setFormData({
//                               vehicleName: '',
//                               brand: '',
//                               type: '',
//                               owner: '',
//                               registrationNumber: '',
//                               licenceDoc: '',
//                               insuranceDoc: '',
//                               fuelType: '',
//                               transmission: '',
//                               seats: '',
//                               pricePerDay: '',
//                               availabilityStatus: '',
//                               isApproved: ''
//                         })
//                         setPreviewVehicleImage(null);
//                   }

//                   const uploads = await Promise.all([
//                         files.image ? uploadVehicleImage(files.image) : null,
//                         files.licenceDoc ? uploadLicence(files.licenceDoc) : null,
//                         files.insuranceDoc ? uploadInsurance(files.insuranceDoc) : null,
//                   ])
//                   const [imageUrl, licenceUrl, insuranceUrl] = uploads;
//                   const payload = {
//                         ...formdata,
//                         image: imageUrl || formdata.image,
//                         licenceDoc: licenceUrl || formdata.licenceDoc,
//                         insuranceDoc: insuranceUrl || formdata.insuranceDoc,
//                         seats: Number(formdata.seats),
//                         pricePerDay: Number(formdata.pricePerDay)
//                   }
//                   if (imageUrl) payload.image = imageUrl;
//                   if (licenceUrl) payload.licenceDoc = licenceUrl;
//                   if (insuranceUrl) payload.insuranceDoc = insuranceUrl;
//                   if(editId) {
//                         dispatch(updateVehicle({ editId, formData: payload, handleReset: resetFormData }));
//                   } else {
//                         dispatch(createVehicle({ formData: payload, handleReset: resetFormData }));
//                   }
//          }

//       return(
//             <SidebarProvider>
//             <AppSidebar />
//                   <main className="p-4 w-full">
//                   <h1 className="text-xl font-semibold mb-4">
//                      {editId ? "Edit Vehicle" : "Add Vehicle"}
//                   </h1>
//                   {errors && <p>{ errors }</p>}
//                   <form onSubmit={handleSubmit}>
//                         <div className="grid grid-cols-12 gap-6">
//                         <div className="col-span-4 flex flex-col gap-6">
//                         {previewVehicleImage && (
//                            <img
//                                  src={previewVehicleImage}
//                                  alt="vehicle"
//                                  className="w-40 h-24 object-cover rounded-md border"
//                            />
//                         )}
//                        <div className="flex flex-col gap-2">
//                            <Label htmlFor="image">Vehicle Image</Label>
//                            <Input id="image" 
//                                    name="image" 
//                                    type="file" 
//                                    accept="image/*" 
//                                    onChange={handleFileChange} 
//                            />
//                        </div>
//                     <div className="grid w-full max-w-sm items-center gap-3">
//                            <Label htmlFor="licenceDoc">LicenceDoc</Label>
//                            <div className="flex items-center gap-3 w-full">
//                            <Input id="licenceDoc" 
//                                    name="licenceDoc" 
//                                    type="file" 
//                                    onChange={handleFileChange}
//                            />
//                         { files.licenceDoc ? (
//                         <span className="text-gray-500 truncate max-w-xs">{files.licenceDoc.name}</span>
//                         ) : formdata.licenceDoc ? (
//                         <a
//                           href={formdata.licenceDoc}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline truncate max-w-xs"
//                           title={formdata.licenceDoc.split("/").pop()}
//                         >
//                           {formdata.licenceDoc.split("/").pop()}
//                         </a>
//                         ) : null}
//                     </div>
//                 </div>
//                 <div className="grid w-full max-w-sm items-center gap-3">
//                     <Label htmlFor="insuranceDoc">InsuranceDoc</Label>
//                     <div className="flex items-center gap-3 w-full">
//                     <Input id="insuranceDoc" name="insuranceDoc" type="file" onChange={handleFileChange}/>
//                         { files.insuranceDoc ? (
//                         <span className="text-gray-500 truncate max-w-xs">{files.insuranceDoc.name}</span>
//                         ) : formdata.insuranceDoc ? (
//                         <a
//                           href={formdata.insuranceDoc}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 underline truncate max-w-xs"
//                           title={formdata.insuranceDoc.split("/").pop()}
//                         >
//                           {formdata.insuranceDoc.split("/").pop()}
//                         </a>
//                         ) : null}
//                     </div>
//                 </div>
//                  </div>
//                 <div className="col-span-4 flex flex-col gap-8">
//                 <InputGroup>
//                 <InputGroupAddon align="block-start">
//                    <Label htmlFor="vehicleName" className="text-foreground">
//                      Vehicle Name
//                    </Label>
//                 <Tooltip>
//                    <TooltipTrigger asChild>
//                    <InputGroupButton
//                        variant="ghost"
//                        aria-label="Help"
//                        className="ml-auto rounded-full"
//                        size="icon-xs"
//                     >
//                     <InfoIcon />
//                     </InputGroupButton>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                        <p>We&apos;ll use this to send you notifications</p>
//                     </TooltipContent>
//                 </Tooltip>
//                 </InputGroupAddon>
//                 <InputGroupInput id="vehicleName" 
//                         name="vehicleName"
//                         value={formdata.vehicleName}
//                         placeholder="Enter Vehicle Name"
//                         onChange={handleChange}
//                 />
//                 </InputGroup>
//                  <InputGroup>
//                 <InputGroupAddon align="block-start">
//                    <Label htmlFor="Brand" className="text-foreground">
//                      Brand
//                    </Label>
//                 <Tooltip>
//                    <TooltipTrigger asChild>
//                    <InputGroupButton
//                        variant="ghost"
//                        aria-label="Help"
//                        className="ml-auto rounded-full"
//                        size="icon-xs"
//                     >
//                     <InfoIcon />
//                     </InputGroupButton>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                        <p>We&apos;ll use this to send you notifications</p>
//                     </TooltipContent>
//                 </Tooltip>
//                 </InputGroupAddon>
//                 <InputGroupInput id="brand" 
//                         name="brand"
//                         value={formdata.brand}
//                         placeholder="Enter Brand"
//                         onChange={handleChange}
//                 />
//                 </InputGroup>
//                  <InputGroup>
//                 <InputGroupAddon align="block-start">
//                    <Label htmlFor="registrationNumber" className="text-foreground">
//                      Registration Number
//                    </Label>
//                 <Tooltip>
//                    <TooltipTrigger asChild>
//                    <InputGroupButton
//                        variant="ghost"
//                        aria-label="Help"
//                        className="ml-auto rounded-full"
//                        size="icon-xs"
//                     >
//                     <InfoIcon />
//                     </InputGroupButton>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                        <p>We&apos;ll use this to send you notifications</p>
//                     </TooltipContent>
//                 </Tooltip>
//                 </InputGroupAddon>
//                 <InputGroupInput id="registrationNumber" 
//                         name="registrationNumber"
//                         value={formdata.registrationNumber}
//                         placeholder="Enter Registration Number"
//                         onChange={handleChange}
//                 />
//                 </InputGroup>
                
//                  <NativeSelect
//   name="type"
//   value={formdata.type}
//   onChange={handleChange}
// >
//   <NativeSelectOption value="">Select Type</NativeSelectOption>
//   <NativeSelectOption value="car">Car</NativeSelectOption>
//   <NativeSelectOption value="bike">Bike</NativeSelectOption>
// </NativeSelect>
//                 </div>
//                 <div className="col-span-4 flex flex-col gap-8">
//                   <NativeSelect
//   name="fuelType"
//   value={formdata.fuelType}
//   onChange={handleChange}
// >
//   <NativeSelectOption value="">Select Fuel Type</NativeSelectOption>
//   <NativeSelectOption value="petrol">Petrol</NativeSelectOption>
//   <NativeSelectOption value="diesel">Diesel</NativeSelectOption>
//   <NativeSelectOption value="electric">Electric</NativeSelectOption>
// </NativeSelect>
// <NativeSelect
//   name="transmission"
//   value={formdata.transmission}
//   onChange={handleChange}
// >
//   <NativeSelectOption value="">Select Transmission</NativeSelectOption>
//   <NativeSelectOption value="manual">Manual</NativeSelectOption>
//   <NativeSelectOption value="automatic">Automatic</NativeSelectOption>
// </NativeSelect>


//                   <InputGroup>
//                 <InputGroupAddon align="block-start">
//                    <Label htmlFor="seats" className="text-foreground">
//                      Seats
//                    </Label>
//                 <Tooltip>
//                    <TooltipTrigger asChild>
//                    <InputGroupButton
//                        variant="ghost"
//                        aria-label="Help"
//                        className="ml-auto rounded-full"
//                        size="icon-xs"
//                     >
//                     <InfoIcon />
//                     </InputGroupButton>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                        <p>We&apos;ll use this to send you notifications</p>
//                     </TooltipContent>
//                 </Tooltip>
//                 </InputGroupAddon>
//                 <InputGroupInput id="seats" 
//                         name="seats"
//                         value={formdata.seats}
//                         placeholder="Enter Seats"
//                         onChange={handleChange}
//                 />
//                 </InputGroup>
//                 <InputGroup>
//                 <InputGroupAddon align="block-start">
//                    <Label htmlFor="pricePerDay" className="text-foreground">
//                      Price Per Day
//                    </Label>
//                 <Tooltip>
//                    <TooltipTrigger asChild>
//                    <InputGroupButton
//                        variant="ghost"
//                        aria-label="Help"
//                        className="ml-auto rounded-full"
//                        size="icon-xs"
//                     >
//                     <InfoIcon />
//                     </InputGroupButton>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                        <p>We&apos;ll use this to send you notifications</p>
//                     </TooltipContent>
//                 </Tooltip>
//                 </InputGroupAddon>
//                 <InputGroupInput id="pricePerDay" 
//                         name="pricePerDay"
//                         value={formdata.pricePerDay}
//                         placeholder="Enter Price"
//                         onChange={handleChange}
//                 />
//                 </InputGroup>
//                 <NativeSelect
//   name="availabilityStatus"
//   value={formdata.availabilityStatus}
//   onChange={handleChange}
// >

                
//                     <NativeSelectOption value="available">Available</NativeSelectOption>
// <NativeSelectOption value="booked">Booked</NativeSelectOption>
// <NativeSelectOption value="maintenance">Maintenance</NativeSelectOption>
// <NativeSelectOption value="unavailable">Unavailable</NativeSelectOption>

//                 </NativeSelect>
//                 </div>
//                 </div>
//                 <div className="flex justify-start mt-18 gap-4">
//                      <Button type="submit">Submit</Button>
//                      <Button variant="outline" type="button">
//                         Cancel
//                      </Button>
//                 </div>
//             </form>
//             </main>
//         </SidebarProvider> 
//    )
// }


"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle, updateVehicle } from "../../slices/vehicleSlice";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export default function OwnerAddVehicle() {
  const dispatch = useDispatch();
  const { errors, editId, data } = useSelector((state) => state.vehicle);

  const [formData, setFormData] = useState({
    vehicleName: "",
    brand: "",
    type: "",
    registrationNumber: "",
    fuelType: "",
    transmission: "",
    seats: "",
    pricePerDay: "",
    availabilityStatus: "",
    location: "",
  })

  const [files, setFiles] = useState({
    image: null,
    licenseDoc: null,
    insuranceDoc: null,
  })

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editId && data) {
      const vehicle = data.find((v) => v._id === editId);
      if (vehicle) {
        setFormData({
          vehicleName: vehicle.vehicleName || "",
          brand: vehicle.brand || "",
          type: vehicle.type || "",
          registrationNumber: vehicle.registrationNumber || "",
          fuelType: vehicle.fuelType || "",
          transmission: vehicle.transmission || "",
          seats: vehicle.seats || "",
          pricePerDay: vehicle.pricePerDay || "",
          availabilityStatus: vehicle.availabilityStatus || "",
          location: vehicle.location || "",
        })
        setPreviewImage(vehicle.image || null);
      }
    }
  }, [editId, data])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles({ ...files, [e.target.name]: file });
    if (e.target.name === "image") setPreviewImage(URL.createObjectURL(file));
  }

  const resetForm = () => {
    setFormData({
      vehicleName: "",
      brand: "",
      type: "",
      registrationNumber: "",
      fuelType: "",
      transmission: "",
      seats: "",
      pricePerDay: "",
      availabilityStatus: "",
      location: ""
    })
    setFiles({ image: null, licenseDoc: null, insuranceDoc: null });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "seats" || key === "pricePerDay") {
        form.append(key, Number(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    })

    if (!files.image || !files.licenseDoc || !files.insuranceDoc) {
      return alert("Please upload all required files!");
    }
    form.append("image", files.image);
    form.append("licenseDoc", files.licenseDoc);
    form.append("insuranceDoc", files.insuranceDoc);

    if (editId) {
      await dispatch(updateVehicle({ editId, formData: form })).unwrap();
      alert("Vehicle updated successfully!");
    } else {
      await dispatch(createVehicle({ formData: form })).unwrap();
      alert("Vehicle added successfully!");
    }

    resetForm();
  } catch (err) {
    console.error("Submit error:", err);
    alert("Failed to submit vehicle. Check console.");
  }
};


      return(
            <SidebarProvider>
            <AppSidebar />
                  <main className="p-4 w-full">
                  <h1 className="text-xl font-semibold mb-4">
                     {editId ? "Edit Vehicle" : "Add Vehicle"}
                  </h1>
                  {errors && <p>{ errors }</p>}
                  <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-4 flex flex-col gap-6">
                        {previewImage && (
                           <img
                                 src={previewImage}
                                 alt="vehicle"
                                 className="w-40 h-24 object-cover rounded-md border"
                           />
                        )}
                       <div className="flex flex-col gap-2">
                           <Label htmlFor="image">Vehicle Image</Label>
                           <Input id="image" 
                                   name="image" 
                                   type="file" 
                                   accept="image/*" 
                                   onChange={handleFileChange} 
                           />
                       </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                           <Label htmlFor="licenseDoc">LicenseDoc</Label>
                           <div className="flex items-center gap-3 w-full">
                           <Input id="licenseDoc" 
                                   name="licenseDoc" 
                                   type="file" 
                                   onChange={handleFileChange}
                           />
                        { files.licenseDoc ? (
                        <span className="text-gray-500 truncate max-w-xs">{files.licenseDoc.name}</span>
                        ) : formData.licenseDoc ? (
                        <a
                          href={formData.licenseDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={formData.licenseDoc.split("/").pop()}
                        >
                          {formData.licenseDoc.split("/").pop()}
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
                        ) : formData.insuranceDoc ? (
                        <a
                          href={formData.insuranceDoc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline truncate max-w-xs"
                          title={formData.insuranceDoc.split("/").pop()}
                        >
                          {formData.insuranceDoc.split("/").pop()}
                        </a>
                        ) : null}
                    </div>
                </div>
                 </div>
                <div className="col-span-4 flex flex-col gap-8">
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="vehicleName" className="text-foreground">
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
                        value={formData.vehicleName}
                        placeholder="Enter Vehicle Name"
                        onChange={handleChange}
                />
                </InputGroup>
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
                        name="brand"
                        value={formData.brand}
                        placeholder="Enter Brand"
                        onChange={handleChange}
                />
                </InputGroup>
                 <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="registrationNumber" className="text-foreground">
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
                <InputGroupInput id="registrationNumber" 
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        placeholder="Enter Registration Number"
                        onChange={handleChange}
                />
                </InputGroup>
                 <NativeSelect
  name="type"
  value={formData.type}
  onChange={handleChange}
>
  <NativeSelectOption value="">Select Type</NativeSelectOption>
  <NativeSelectOption value="Car">Car</NativeSelectOption>
  <NativeSelectOption value="Bike">Bike</NativeSelectOption>
</NativeSelect>
<NativeSelect
  name="fuelType"
  value={formData.fuelType}
  onChange={handleChange}
>
  <NativeSelectOption value="">Select Fuel Type</NativeSelectOption>
  <NativeSelectOption value="Petrol">Petrol</NativeSelectOption>
  <NativeSelectOption value="Diesel">Diesel</NativeSelectOption>
  <NativeSelectOption value="Electric">Electric</NativeSelectOption>
</NativeSelect>
                </div>
                <div className="col-span-4 flex flex-col gap-8">
<NativeSelect
  name="transmission"
  value={formData.transmission}
  onChange={handleChange}
>
  <NativeSelectOption value="">Select Transmission</NativeSelectOption>
  <NativeSelectOption value="Manual">Manual</NativeSelectOption>
  <NativeSelectOption value="Electric">Electric</NativeSelectOption>
</NativeSelect>
                  <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="seats" className="text-foreground">
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
                <InputGroupInput id="seats" 
                        name="seats"
                        value={formData.seats}
                        placeholder="Enter Seats"
                        onChange={handleChange}
                />
                </InputGroup>
                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="pricePerDay" className="text-foreground">
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
                <InputGroupInput id="pricePerDay" 
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        placeholder="Enter Price"
                        onChange={handleChange}
                />
                </InputGroup>
                <NativeSelect
  name="availabilityStatus"
  value={formData.availabilityStatus}
  onChange={handleChange}
>
  <NativeSelectOption value="">
    Select Availability
  </NativeSelectOption>
  <NativeSelectOption value="Available">Available</NativeSelectOption>
  <NativeSelectOption value="Booked">Booked</NativeSelectOption>
  <NativeSelectOption value="Maintainance">Maintainance</NativeSelectOption>
  <NativeSelectOption value="unAvailable">Unavailable</NativeSelectOption>
</NativeSelect>

                <InputGroup>
                <InputGroupAddon align="block-start">
                   <Label htmlFor="location" className="text-foreground">
                     Location
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
                <InputGroupInput id="location" 
                        name="location"
                        value={formData.location}
                        placeholder="Enter Location"
                        onChange={handleChange}
                />
                </InputGroup>
                </div>
                </div>
                <div className="flex justify-start mt-18 gap-4">
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



//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="p-4 w-full">
//         <h1 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Vehicle" : "Add Vehicle"}
//         </h1>

//         {errors && (
//           <p className="text-red-500">
//             {typeof errors === "string" ? errors : errors[0]?.message}
//           </p>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-12 gap-6">
//             <div className="col-span-4 space-y-4">
//               {previewImage && (
//                 <img
//                   src={previewImage}
//                   alt="vehicle"
//                   className="w-40 h-24 object-cover rounded-md border"
//                 />
//               )}
//               <Label>Vehicle Image</Label>
//               <Input type="file" name="image" onChange={handleFileChange} />

//               <Label>License</Label>
//               <Input type="file" name="licenseDoc" onChange={handleFileChange} />

//               <Label>Insurance</Label>
//               <Input type="file" name="insuranceDoc" onChange={handleFileChange} />
//             </div>

//             <div className="col-span-4 space-y-4">
//               <Input
//                 name="vehicleName"
//                 placeholder="Vehicle Name"
//                 value={formData.vehicleName}
//                 onChange={handleChange}
//               />
//               <Input
//                 name="brand"
//                 placeholder="Brand"
//                 value={formData.brand}
//                 onChange={handleChange}
//               />
//               <Input
//                 name="registrationNumber"
//                 placeholder="Registration Number"
//                 value={formData.registrationNumber}
//                 onChange={handleChange}
//               />
//               <NativeSelect name="type" value={formData.type} onChange={handleChange}>
//                 <NativeSelectOption value="">Select Type</NativeSelectOption>
//                 <NativeSelectOption value="Car">Car</NativeSelectOption>
//                 <NativeSelectOption value="Bike">Bike</NativeSelectOption>
//               </NativeSelect>
//             </div>

//             <div className="col-span-4 space-y-4">
//               <NativeSelect
//                 name="fuelType"
//                 value={formData.fuelType}
//                 onChange={handleChange}
//               >
//                 <NativeSelectOption value="">Fuel Type</NativeSelectOption>
//                 <NativeSelectOption value="Petrol">Petrol</NativeSelectOption>
//                 <NativeSelectOption value="Diesel">Diesel</NativeSelectOption>
//                 <NativeSelectOption value="Electric">Electric</NativeSelectOption>
//               </NativeSelect>

//               <NativeSelect
//                 name="transmission"
//                 value={formData.transmission}
//                 onChange={handleChange}
//               >
//                 <NativeSelectOption value="">Transmission</NativeSelectOption>
//                 <NativeSelectOption value="Manual">Manual</NativeSelectOption>
//                 <NativeSelectOption value="Automatic">Electric</NativeSelectOption>
//               </NativeSelect>

//               <Input
//                 name="seats"
//                 placeholder="Seats"
//                 value={formData.seats}
//                 onChange={handleChange}
//               />

//               <Input
//                 name="pricePerDay"
//                 placeholder="Price Per Day"
//                 value={formData.pricePerDay}
//                 onChange={handleChange}
//               />

//               <NativeSelect
//                 name="availabilityStatus"
//                 value={formData.availabilityStatus}
//                 onChange={handleChange}
//               >
//                 <NativeSelectOption value="">Availability</NativeSelectOption>
//                 <NativeSelectOption value="Available">Available</NativeSelectOption>
//                 <NativeSelectOption value="Booked">Booked</NativeSelectOption>
//                 <NativeSelectOption value="Maintenance">Maintenance</NativeSelectOption>
//                 <NativeSelectOption value="Unavailable">Unavailable</NativeSelectOption>
//               </NativeSelect>

//               <Input
//                 name="location"
//                 placeholder="Location"
//                 value={formData.location}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <Button type="submit">{editId ? "Update Vehicle" : "Add Vehicle"}</Button>
//           </div>
//         </form>
//       </main>
//     </SidebarProvider>
//   );
// }
