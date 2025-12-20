import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocumentData } from "./DocumentApi";

export const fetchDocumentData = createAsyncThunk(
  "documents/fetchDocumentData",
  async ({page, perPage, search}, { rejectedWithValue }) => {
    try {
      const data = await getDocumentData(page, perPage, search);
      return data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState: {
    documentData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentData.fulfilled, (state, action) => {
        state.documentData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocumentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.documentData = null

      });
  },
});

export default documentSlice.reducer;
