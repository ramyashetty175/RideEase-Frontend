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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export default function OwnerAddVehicle() {
    const dispatch = useDispatch();
    const { data, editId } = useSelector((state) => {
        return state.vehicle;
    })
 
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
    const [alert, setAlert] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editId && data) {
            const vehicle = data.find((v) => v._id === editId);
            if (vehicle) {
                setFormData({
                    vehicleName: vehicle.vehicleName,
                    brand: vehicle.brand,
                    type: vehicle.type,
                    registrationNumber: vehicle.registrationNumber,
                    fuelType: vehicle.fuelType,
                    transmission: vehicle.transmission,
                    seats: vehicle.seats,
                    pricePerDay: vehicle.pricePerDay,
                    availabilityStatus: vehicle.availabilityStatus,
                    location: vehicle.location,
                })
                setFiles({ image: null, licenseDoc: null, insuranceDoc: null });
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
        if (e.target.name === "image") {
            setPreviewImage(URL.createObjectURL(file));
        }
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
        const errors = {};
        if(!files.image) {
            errors.image = "Vehicle Image is required";
        }
        if(!files.licenseDoc) {
            errors.licenseDoc = "Vehicle LicenceDoc is required";
        }
        if(!files.insuranceDoc) {
            errors.insuranceDoc = "Vehicle InsuranceDoc is required";
        }
        if(formData.vehicleName.trim().length == 0) {
            errors.vehicleName = "Vehicle Name is required";
        } else if (formData.vehicleName.length < 3) {
            errors.vehicleName = "Vehicle Name is too short";
        }
        if(formData.brand.trim().length == 0) {
            errors.brand = "Vehicle Brand is required";
        }
        if(formData.registrationNumber.trim().length == 0) {
            errors.registrationNumber = "Vehicle Registration Number is required";
        }else if (formData.registrationNumber.length < 4) {
            errors.registrationNumber = "Invalid registration number";
        }
        if(!formData.type) {
            errors.type = "Vehicle Type is required";
        }
        if(!formData.fuelType) {
            errors.fuelType = "Vehicle Fuel Type is required";
        }
        if(!formData.transmission) {
            errors.transmission = "Vehicle  Transmission is required";
        }
        if(!formData.availabilityStatus) {
            errors.availabilityStatus = "Vehicle Availability Status is required";
        }
        if(formData.seats.trim().length == 0) {
            errors.seats = "Vehicle Seats is required";
        }else if (isNaN(formData.seats) || Number(formData.seats) <= 0) {
            errors.seats = "Seats must be a valid positive number";
        }
        if(formData.pricePerDay.trim().length == 0) {
            errors.pricePerDay = "Vehicle Price Per Day is required";
        }else if (isNaN(formData.pricePerDay) || Number(formData.pricePerDay) <= 0) {
            errors.pricePerDay = "Price per day must be a valid amount";
        }
        if(formData.location.trim().length == 0) {
            errors.location = "Vehicle location is required";
        }
        if(Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
        try {
            const form = new FormData();
            Object.keys(formData).forEach(key => {
                form.append(key, formData[key]);
            })
            if (files.image) {
                form.append("image", files.image);
            }
            if (files.licenseDoc) {
                form.append("licenseDoc", files.licenseDoc);
            }
            if (files.insuranceDoc) {
                form.append("insuranceDoc", files.insuranceDoc);
            }
            if (editId) {
                dispatch(updateVehicle({ editId, formData: form }));
                setErrors({});
                setAlert({ type: "success", message: "Vehicle updated successfully!" });
            } else {
                dispatch(createVehicle({ formData: form }));
                resetForm();
                setErrors({});
                setAlert({ type: "success", message: "Vehicle added successfully!" });
                resetForm();
            }
            setTimeout(() => setAlert(null), 3000);
        } catch (err) {
            console.error(err);
            setAlert({ type: "error", message: "Something went wrong!" });
            setTimeout(() => setAlert(null), 3000);
        }
    }
  }
    return(
            <SidebarProvider>
            <AppSidebar />
                  <main className="p-4 w-full">
                  <h1 className="text-xl font-semibold mb-4">
                     {editId ? "Edit Vehicle" : "Add Vehicle"}
                  </h1>
                  {alert && (
                      <Alert
                          variant={alert.type === "error" ? "destructive" : "default"}
                          className="mb-4 flex items-start gap-2"
                      >
                      {alert.type === "error" ? (
                          <AlertCircleIcon />
                            ) : (
                          <CheckCircle2Icon />
                      )}
                          <AlertTitle>
                              {alert.message}
                          </AlertTitle>
                      </Alert>
                  )}
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
                          {errors.image && (
                              <span style={{ color: "red" }}>{errors.image}</span>
                          )}
                           <Label htmlFor="image">Vehicle Image</Label>
                           <Input id="image" 
                                name="image" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                           />
                      </div>
                      {errors.licenseDoc && (
                          <span style={{ color: "red" }}>{errors.licenseDoc}</span>
                      )}
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
                      {errors.insuranceDoc && (
                          <span style={{ color: "red" }}>{errors.insuranceDoc}</span>
                      )}
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
                          {errors.vehicleName && (
                            <span style={{ color: "red" }}>{errors.vehicleName}</span>
                          )}
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
                        <p>Vehicle Name</p>
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
                      {errors.brand && (
                        <span style={{ color: "red" }}>{errors.brand}</span>
                      )}
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
                       <p>Brand</p>
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
                    {errors.registrationNumber && (
                      <span style={{ color: "red" }}>{errors.registrationNumber}</span>
                    )}
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
                      <p>Registration Number</p>
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
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type}</span>
                  )}
                 <NativeSelect
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <NativeSelectOption value="">Select Type</NativeSelectOption>
                    <NativeSelectOption value="Car">Car</NativeSelectOption>
                    <NativeSelectOption value="Bike">Bike</NativeSelectOption>
                  </NativeSelect>
                  {errors.fuelType && (
                    <span style={{ color: "red" }}>{errors.fuelType}</span>
                  )}
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
                  {errors.transmission && (
                    <span style={{ color: "red" }}>{errors.transmission}</span>
                  )}
                  <NativeSelect
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                  >
                    <NativeSelectOption value="">Select Transmission</NativeSelectOption>
                    <NativeSelectOption value="Manual">Manual</NativeSelectOption>
                    <NativeSelectOption value="Electric">Electric</NativeSelectOption>
                 </NativeSelect>
                  {errors.seats && (
                    <span style={{ color: "red" }}>{errors.seats}</span>
                  )}
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
                       <p>Seats</p>
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
                    {errors.pricePerDay && (
                      <span style={{ color: "red" }}>{errors.pricePerDay}</span>
                    )}
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
                      <p>Price Per Day</p>
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
                    {errors.availabilityStatus && (
                      <span style={{ color: "red" }}>{errors.availabilityStatus}</span>
                    )}
                    <NativeSelect
                      name="availabilityStatus"
                      value={formData.availabilityStatus}
                      onChange={handleChange}
                    >
                    <NativeSelectOption value="">Select Availability</NativeSelectOption>
                      <NativeSelectOption value="Available">Available</NativeSelectOption>
                      <NativeSelectOption value="Booked">Booked</NativeSelectOption>
                      <NativeSelectOption value="Maintainance">Maintainance</NativeSelectOption>
                      <NativeSelectOption value="unAvailable">Unavailable</NativeSelectOption>
                   </NativeSelect>
                    {errors.location && (
                      <span style={{ color: "red" }}>{errors.location}</span>
                    )}
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
                      <p>Location</p>
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
                  </div>
            </form>
          </main>
      </SidebarProvider> 
   )
}