import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchBooking = createAsyncThunk("booking/fetchBooking", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/bookings', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async ({ formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/bookings', formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data.error);
    }
})

export const bookingApprove = createAsyncThunk("Booking/bookingApprove", async({ editId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/vehicles/approve/${editId}`, null, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        // handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const bookingCancel = createAsyncThunk("Booking/bookingCancel", async({ editId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/vehicles/reject/${editId}`, null, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        // handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const updateBooking = createAsyncThunk("booking/updateBooking", async ({ editId, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/bookings/${editId}`, formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const removeBooking = createAsyncThunk("booking/removeBooking", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/bookings/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return err.message;
    }
}) 

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        data: [],
        errors: null,
        loading: false,
        editId: null
    },
    reducers: {
        resetBooking: (state) => {
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
            .addCase(fetchBooking.pending,(state)=> {
                state.loading = true;
                state.data = [];
                state.errors = null;
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.errors = null;
            })
            .addCase(fetchBooking.rejected,(state,action)=> {
                state.data = [];
                state.errors = action.payload;
                state.loading = false;
            })

            .addCase(createBooking.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.errors = null;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.errors = action.payload;
            })
            
            .addCase(bookingApprove.pending, (state) => {
                state.loading = true;
                // state.data = [];
                state.errors = null;
            })
            .addCase(bookingApprove.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload.booking._id);
                state.data[idx] = action.payload.booking;
                state.editId = null;
                state.loading = false; 
            })
            .addCase(bookingApprove.rejected, (state, action) => {
                state.errors = action.payload.booking;
                state.loading = false; 
            })
            .addCase(bookingCancel.pending, (state) => {
                state.loading = true;
                // state.data = [];
                state.errors = null;
            })
            .addCase(bookingCancel.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload.booking._id);
                state.data[idx] = action.payload.vehicle.booking; 
                state.editId = null;
                state.loading = false; 
            })
            .addCase(bookingCancel.rejected, (state, action) => {
                state.errors = action.payload;
                state.loading = false;
            })

            .addCase(updateBooking.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(removeBooking.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data.splice(idx, 1);
            })
            .addCase(removeBooking.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
})

export const { resetBooking, assignEditId, resetEditId } = bookingSlice.actions;

export default bookingSlice.reducer;