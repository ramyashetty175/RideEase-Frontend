import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        data: [],
        errors: null,
        loading: false,
        editId: null
    },
    reducers: {

    }
    // extraReducers: (builder) => {
    //     builder

    // }
})