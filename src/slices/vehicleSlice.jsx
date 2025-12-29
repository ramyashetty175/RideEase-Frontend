import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchVehicles = createAsyncThunk("vehicle/fetchVehicles", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/vehicles', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const createVehicle = createAsyncThunk("vehicle/createVehicle", async({ formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/vehicles', formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data.error);
    }
})

export const updateVehicle = createAsyncThunk("vehicle/updateVehicle", async ({ editId, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/vehicles/${editId}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const removeVehicle = createAsyncThunk("vehicle/removeVehicle", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/vehicles/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return err.message;
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
            .addCase(fetchVehicles.pending,(state)=> {
                state.loading = true;
                state.data = [];
                state.errors = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.errors = null;
            })
            .addCase(fetchVehicles.rejected,(state,action)=> {
                state.data = [];
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(createVehicle.pending, (state) => {
                state.loading = true;
                // state.data = [];
                state.errors = null;
            })
            .addCase(createVehicle.fulfilled, (state, action) => {
                // state.data.push(action.payload);
                state.data.push(action.payload.vehicle);
                state.errors = null;
            })
            .addCase(createVehicle.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(removeVehicle.pending, (state) => {
                state.loading = true;
                // state.data = [];
                state.errors = null;
            })
            .addCase(removeVehicle.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data.splice(idx, 1);
            })
            .addCase(removeVehicle.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(updateVehicle.pending, (state) => {
                state.loading = true;
                // state.data = [];
                state.errors = null;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
})

export const { resetEditId, assignEditId, resetVehicles } = vehicleSlice.actions;

export default vehicleSlice.reducer;