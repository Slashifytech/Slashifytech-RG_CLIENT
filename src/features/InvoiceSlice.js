import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInvoiceById } from "./InvoiceApi";

export const fetchInvoiceById = createAsyncThunk(
  "teams/fetchInvoiceById",
  async ({invoiceId}, { rejectWithValue }) => {
    try {
      const data = await getInvoiceById(invoiceId);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const invoiceSlice = createSlice({
    name: "invoice",
    initialState:{
        invoiceById:[]
        
    },
    reducers:{
      setEmptyInvoiceData(state){
           state.invoiceById = []
      }, 
   
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchInvoiceById.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchInvoiceById.fulfilled, (state, action)=>{
            state.invoiceById = action.payload;
            state.loading = false;
        })
      .addCase(fetchInvoiceById.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.invoiceById = []
      })
    }
})

export const {setEmptyInvoiceData} = invoiceSlice.actions
export default invoiceSlice.reducer;