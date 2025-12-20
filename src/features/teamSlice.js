import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTeams } from "./teamApi";

export const fetchTeamData = createAsyncThunk(
  "teams/fetchTeamData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTeams();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const teamSlice = createSlice({
    name: "team",
    initialState:{
        allTeams: []
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTeamData.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTeamData.fulfilled, (state, action)=>{
            state.allTeams = action.payload;
            state.loading = false;
        })
      .addCase(fetchTeamData.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
      })
    }
})


export default teamSlice.reducer;