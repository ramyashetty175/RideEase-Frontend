import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle, updateVehicle } from "../slices/vehicleSlice";

export default function AdminAddVehicle() {
    const { errors, data, editId } = useSelector((state) => {
        return state.vehicle;
    })

    const dispatch = useDispatch();
    const [state, setState] = useState({

    });

    const handleReset = () => {
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {

        }
        console.log(formData);
    if(editId) {
        dispatch(updateVehicle({ editId, formData, handleReset }));
    } else {
        dispatch(createVehicle({ formData, handleReset }));
    }
}
    useEffect(() => {
        if(editId) {

        } else {

        }
    }, [editId])

    return(
        <div>
            <h2>{ editId ? 'Edit' : 'Add' } Vehicle</h2>
            { errors && <p>{ errors }</p>}
            <form onSubmit={handleSubmit}>
               <input type = "text"
                      name = "name"
                      value = {name}
                      onChange={(e) => {

                      }}
               />
               <input type="submit" />
            </form>
        </div>
    )
}