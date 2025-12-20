// redux/policySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cancelRequest,
  getAllPendingPolicy,
  policyData,
  submitPolicyData,
  updatePolicyStatus,
} from "./policyapi";

export const submitPolicy = createAsyncThunk(
  "policy/submitPolicy",
  async ({ userId, policyData, token, addNew, update, pId, teamId }, { rejectWithValue }) => {
    try {
      const response = await submitPolicyData(userId, policyData, token, addNew, update, pId, teamId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllPendingPolicy = createAsyncThunk(
  "policies/fetchAllPendingPolicy",
  async ({ page = 1, limit = 10, manufacturer }, { rejectWithValue }) => {
    try {
      const data = await getAllPendingPolicy(page, limit, manufacturer);
      return data;
    } catch (err) {
      console.error("Error in fetchAllPendingPolicy Thunk:", err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
export const updatePolicy = createAsyncThunk(
  "policy/updatePolicy",
  async ({ userId, type, policyData, reason }, { rejectWithValue }) => {
    try {
      const response = await updatePolicyStatus(userId, type, policyData, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const cancelReqPolicy = createAsyncThunk(
  "policy/cancelReqPolicy",
  async (id , { rejectWithValue }) => {
    try {
      const response = await cancelRequest(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchPolicyAllData = createAsyncThunk(
  "policy/fetchPolicyAllData",
  async ({page, perPage, searchTerm, policyStatus, userId} , { rejectWithValue }) => {
    try {
      const response = await policyData(page, perPage, searchTerm, policyStatus, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const policySlice = createSlice({
  name: "policy",
  initialState: {
    policy: null,
    pendingPolicy: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      totalPoliciesCount: 0,
      totalpagesCount: 0,
     
    },
    
    policyUpdate: [],
    policies:[],
    cancelReq: "",
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitPolicy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitPolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.policy = action.payload.data;
      })
      .addCase(submitPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllPendingPolicy.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllPendingPolicy.fulfilled, (state, action) => {
        state.pendingPolicy = {
          ...state.payload,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.lastPage,
          totalPagesCount: action.payload.totalPagesCount, 
          totalPoliciesCount: action.payload.totalPoliciesCount,
          data: action.payload.data,
        };
        state.status = "succeeded";
      })
      .addCase(fetchAllPendingPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePolicy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.policyUpdate = action.payload;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(cancelReqPolicy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelReqPolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cancelReq = action.payload;
      })
      .addCase(cancelReqPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPolicyAllData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPolicyAllData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.policies = action.payload;
      })
      .addCase(fetchPolicyAllData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.policies = [];


      });
  },
});

export default policySlice.reducer;
