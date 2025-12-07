import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchUser = createAsyncThunk("Owner/fetchUser", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/user', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
}) 

export const fetchOwner = createAsyncThunk("Owner/fetchOwner", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/owner', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
})

export const OwnerApprove = createAsyncThunk("Owner/OwnerApprove", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.put('/api/ApproveOwner', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
})

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        data: [],
        errors: null,
        loading: false,
        editId: null
    },
    reducers: {
        resetOwner: (state) => {
            state.data = [];
            state.errors = null;
            state.loading = false;
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
            .addCase(fetchUser.fulfilled, (state, action) => {

            })
            .addCase(fetchUser.rejected, (state, action) => {

            })
            .addCase(fetchOwner.fulfilled, (state, action) => {

            })
            .addCase(fetchOwner.rejected, (state, action) => {

            })
            .addCase(OwnerApprove.fulfilled, (state, action) => {

            })
            .addCase(OwnerApprove.rejected, (state, action) => {

            })
    }
})

export const { resetOwner, assignEditId, resetEditId} = ownerSlice.actions;

export default ownerSlice.reducers;