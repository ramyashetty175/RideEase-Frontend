import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

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
            .addCase(fetch)
    }
})