import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mbOptionData, mgOptionData } from "./vehicleOptionsApi";

// Thunk for fetching all MG options
export const fetchAllMgOptions = createAsyncThunk(
  "master/fetchAllMgOptions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await mgOptionData();
      return data;
    } catch (err) {
      console.error("Error in fetching mg options Thunk:", err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Thunk for fetching all MB options
export const fetchAllMbOptions = createAsyncThunk(
  "master/fetchAllMbOptions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await mbOptionData();
      return data;
    } catch (err) {
      console.error("Error in fetching mb options Thunk:", err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

// Slice for managing master data
const masterDataSlice = createSlice({
  name: "master",
  initialState: {
    mgData: [],
    mbData: [],
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling MB options
      .addCase(fetchAllMbOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMbOptions.fulfilled, (state, action) => {
        state.mbData = action.payload; // Corrected to mbData
        state.loading = false;
      })
      .addCase(fetchAllMbOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling MG options
      .addCase(fetchAllMgOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMgOptions.fulfilled, (state, action) => {
        state.mgData = action.payload; // Corrected to mgData
        state.loading = false;
      })
      .addCase(fetchAllMgOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default masterDataSlice.reducer;
