// redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiurl from "../utils";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const token = state.auth.token; 
    const token = localStorage.getItem("userAuthToken")
    try {
      const response = await apiurl.get("/getUserData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { roleType } = response.data;

      localStorage.setItem("roleType", roleType);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Create a slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null; 
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        console.log("Fetch users failed:", action.payload);
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
