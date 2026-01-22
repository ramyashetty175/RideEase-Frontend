import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const requestBookingCancel = createAsyncThunk(
  "bookingCancellation/request",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/bookingCancellation/request/${bookingId}`,
        null,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return res.data.bookingcancellation;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchBookingCancellations = createAsyncThunk(
  "bookingCancellation/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "/api/bookingCancellation",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const approveBookingCancel = createAsyncThunk(
  "bookingCancellation/approve",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/bookingCancellation/approve/${id}`,
        null,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return res.data.bookingcancellation;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const rejectBookingCancel = createAsyncThunk(
  "bookingCancellation/reject",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/bookingCancellation/reject/${id}`,
        null,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return res.data.bookingcancellation;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const bookingCancellationSlice = createSlice({
  name: "bookingCancellation",
  initialState: {
    data: [],
    loading: false,
    errors: null,
  },
  reducers: {
    resetCancellation(state) {
      state.data = [];
      state.loading = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // request cancel
      .addCase(requestBookingCancel.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestBookingCancel.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(requestBookingCancel.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // fetch cancellations
      .addCase(fetchBookingCancellations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingCancellations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookingCancellations.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      // approve cancel
      .addCase(approveBookingCancel.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveBookingCancel.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.data.findIndex(
          (c) => c._id === action.payload._id
        );
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
      })
      .addCase(approveBookingCancel.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(rejectBookingCancel.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectBookingCancel.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.data.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
      })
      .addCase(rejectBookingCancel.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
    }
});

export const { resetCancellation } = bookingCancellationSlice.actions;
export default bookingCancellationSlice.reducer;