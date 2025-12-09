import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchVehicles = createAsyncThunk("vehicle/fetchVehicles", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/vehicles', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
})

export const createVehicle = createAsyncThunk("vehicle/createVehicle", async({ formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/', formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data.error);
    }
})

export const removeVehicle = createAsyncThunk("vehicle/removeVehicle", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/vehicle/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return err.message;
    }
})

export const updateVehicle = createAsyncThunk("vehicle/updateVehicle", async ({ editId, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/`, formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
        data: [],
        errors: null,
        loading: false,
        editId: null
    },
    reducers: {
        resetVehicles: (state) => {
            state.data = [],
            state.errors = null,
            state.loading = false
        },
        assignEditId: (state, action) => {
            state.editId = action.payload;
        },
        resetEditId: (state) => {
            state.editId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase()
    }
})

export const { resetEditId, assignEditId, resetVehicles } = vehicleSlice.actions;

export default vehicleSlice.reducer;