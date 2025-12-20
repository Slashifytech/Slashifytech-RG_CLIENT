
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllApprovalsList } from './agentApi';

export const fetchPendingReq = createAsyncThunk(
  "teams/fetchPendingReq",
  async ({page, perPage}, { rejectWithValue }) => {
    try {
      const data = await getAllApprovalsList(page, perPage, userId);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const teamSlice = createSlice({
    name: "agent",
    initialState:{
        approvals: []
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPendingReq.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPendingReq.fulfilled, (state, action)=>{
            state.approvals = action.payload;
            state.loading = false;
        })
      .addCase(fetchPendingReq.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.approvals = [];

      })
    }
})


export default teamSlice.reducer;
