import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBuyBackLists, getBuyBackById } from "./BuybackApi";

export const fetchbuyBackDataById = createAsyncThunk(
  "teams/fetchbuyBackDataById",
  async ({id, status }, { rejectWithValue }) => {
    try {
      const data = await getBuyBackById(id, status);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
}
);

export const fetchBuyBackLists = createAsyncThunk(
    "teams/fetchBuyBackLists",
    async ({page, perPage, searchTerm, userId, status }, { rejectWithValue }) => {
      try {
        const data = await getAllBuyBackLists(page, perPage, searchTerm, userId, status);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  );
const buyBackSlice = createSlice({
  name: "buyBack",
  initialState: {
    buyBackByIdorStatus: null,
    BuyBackLists: null,
  },
  reducers:{
    setEmptytBuyback(state){
      state.buyBackByIdorStatus = []
    }
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchbuyBackDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchbuyBackDataById.fulfilled, (state, action) => {
        state.buyBackByIdorStatus = action.payload;
        state.loading = false;
      })
      .addCase(fetchbuyBackDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.buyBackByIdorStatus = [];
      })
      .addCase(fetchBuyBackLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyBackLists.fulfilled, (state, action) => {
        state.BuyBackLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuyBackLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.BuyBackLists = [];
      });
  },
});
export const {setEmptytBuyback} = buyBackSlice.actions
export default buyBackSlice.reducer;
