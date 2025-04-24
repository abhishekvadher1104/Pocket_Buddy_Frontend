// src/redux/ratingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get rating of a user for an offer
export const fetchUserRating = createAsyncThunk(
  "rating/fetchUserRating",
  async ({ userId, offerId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/rating/getratingsofuseridandofferid/${userId}/${offerId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Submit new rating
export const submitRating = createAsyncThunk(
  "rating/submitRating",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/rating/addrating", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    userRating: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRating.fulfilled, (state, action) => {
        state.loading = false;
        state.userRating = action.payload;
      })
      .addCase(fetchUserRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.userRating = action.meta.arg; 
      });
  },
});

export default ratingSlice.reducer;