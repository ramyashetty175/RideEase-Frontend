import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchOwner = createAsyncThunk("owner/fetchOwner", async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/users/owners', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const OwnerApprove = createAsyncThunk("owner/OwnerApprove", async({ editId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/users/owner/approve/${editId}`, null, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const OwnerReject = createAsyncThunk("owner/OwnerReject", async({ editId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/users/owner/reject/${editId}`, null, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
    }
})

export const removeOwner = createAsyncThunk("category/removeOwner", async(id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/users/profile/${id}`, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err);
        return err.message;
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
            .addCase(fetchOwner.pending,(state)=> {
                state.loading = true;
                state.data = [];
                state.errors = null;
            })
            .addCase(fetchOwner.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.errors = null;
            })
            .addCase(fetchOwner.rejected,(state,action)=> {
                state.data = [];
                state.errors = action.payload;
                state.loading = false;
            })
            
            .addCase(OwnerApprove.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(OwnerApprove.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(OwnerApprove.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(OwnerReject.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(OwnerReject.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload; 
                state.editId = null;
            })
            .addCase(OwnerReject.rejected, (state, action) => {
                state.errors = action.payload;
            })
            .addCase(removeOwner.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(removeOwner.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data.splice(idx, 1);
                state.loading = false;
            })
            .addCase(removeOwner.rejected, (state, action) => {
                state.errors = action.payload;
            })

    }
})

export const { resetOwner, assignEditId, resetEditId } = ownerSlice.actions;

export default ownerSlice.reducer;