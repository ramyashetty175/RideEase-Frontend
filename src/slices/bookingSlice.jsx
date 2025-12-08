import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchBooking = createAsyncThunk("booking/fetchBooking", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/bookings', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
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