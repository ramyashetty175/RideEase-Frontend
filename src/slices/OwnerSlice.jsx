import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchOwner = createAsyncThunk("owner/fetchOwner", async(undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/users/listOwners', { headers: { Authorization: localStorage.getItem('token')}});
        return response.data;
    } catch(err) {
        console.log(err);
    }
})

export const OwnerApprove = createAsyncThunk("owner/ownerApprove", async({ editId, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/users/approveOwner/${editId}`, { headers: { Authorization: localStorage.getItem('token')}});
        console.log(response.data);
        handleReset();
        return response.data;
    } catch(err) {
        console.log(err);
        return rejectWithValue(err.message);
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
            .addCase(fetchOwner.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            // .addCase(fetchOwner.rejected, (state, action) => {

            // })
            .addCase(OwnerApprove.fulfilled, (state, action) => {
                const idx = state.data.findIndex(ele => ele._id == action.payload._id);
                state.data[idx] = action.payload;
                state.editId = null;
            })
            .addCase(OwnerApprove.rejected, (state, action) => {
                state.errors = action.payload;
            })
    }
})

export const { resetOwner, assignEditId, resetEditId} = ownerSlice.actions;

export default ownerSlice.reducer;