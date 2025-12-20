import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAmcList, getAMCbyId } from "./AMCapi";

export const fetchamcDataById = createAsyncThunk(
  "teams/fetchamcDataById",
  async ({id, status, newExtend }, { rejectWithValue }) => {
    try {
      const data = await getAMCbyId(id, status, newExtend);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const fetchamcLists = createAsyncThunk(
    "teams/fetchamcLists",
    async ({page, perPage, searchTerm, userId, status }, { rejectWithValue }) => {
      try {
        const data = await getAllAmcList(page, perPage, searchTerm, userId, status);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  );
const amcSlice = createSlice({
  name: "amc",
  initialState: {
    amcByIdorStatus: [],
    amcLists: null,
  },

  reducers:{
        setEmptyAMC(state){
          state.amcByIdorStatus = []
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchamcDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchamcDataById.fulfilled, (state, action) => {
        state.amcByIdorStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchamcDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.amcByIdorStatus = [];
      })
      .addCase(fetchamcLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchamcLists.fulfilled, (state, action) => {
        state.amcLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchamcLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.amcLists = null;
      });
  },
});
export const {setEmptyAMC} = amcSlice.actions
export default amcSlice.reducer;
