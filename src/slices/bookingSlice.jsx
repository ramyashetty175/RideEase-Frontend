import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchBooking = createAsyncThunk("booking/fetchBooking", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/bookings', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
})

export const createBooking = createAsyncThunk("booking/createBooking", async ({ formData, handleReset }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api', formData, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.response.data.error);
    }
})

export const removeBooking = createAsyncThunk("booking/removeBooking", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete('/api', { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return err.message;
    }
}) 

export const updateBooking = createAsyncThunk("booking/updateBooking", async ({ editId, formData }, { rejectWithValue }) => {
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
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    }
})

export const { resetBooking, assignEditId, resetEditId } = bookingSlice.actions;

export default bookingSlice.reducer;