import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEwLists, getEwId } from "./EwApi";


export const fetchEwById = createAsyncThunk(
  "teams/fetchEwById",
  async ({id, status }, { rejectWithValue }) => {
    try {
      const data = await getEwId(id, status);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
}
);

export const fetchEwLists = createAsyncThunk(
    "teams/fetchEwLists",
    async ({page, perPage, searchTerm, userId, status }, { rejectWithValue }) => {
      try {
        const data = await getAllEwLists(page, perPage, searchTerm, userId, status);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  );
  
const ewSlice = createSlice({
  name: "ewPolicy",
  initialState: {
    ewByIdorStatus: [],
    EwLists: null,
  },
  reducers:{
    setEmptytEw(state){
      state.ewByIdorStatus = []
    }
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEwById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEwById.fulfilled, (state, action) => {
        state.ewByIdorStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchEwById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.ewByIdorStatus = [];
      })
      .addCase(fetchEwLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEwLists.fulfilled, (state, action) => {
        state.EwLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchEwLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.EwLists = [];
      });
  },
});
export const {setEmptytEw} = ewSlice.actions
export default ewSlice.reducer;
