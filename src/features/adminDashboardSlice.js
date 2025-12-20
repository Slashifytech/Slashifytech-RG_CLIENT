import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addNewAgent,
  cancelPolicy,
  deleteAgent,
  getAllInvoice,
  getAllInvoiceByStatus,

  getAllMbAgents,

  getAllMgAgents,

  getAllPolicy,
  getCancelPolicy,
  getTeamMember,
} from "./adminApi";

export const fetchAllMbAgents = createAsyncThunk(
  "admin/fetchAllMbAgents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllMbAgents();
      return data.mbAgents;
    } catch (err) {
      console.error("Error in fetchAllMbAgents Thunk:", err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const fetchAllMgAgents = createAsyncThunk(
  "admin/fetchAllMgAgents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllMgAgents();
      return data.mgAgents;
    } catch (err) {
      console.error("Error in fetchAllMgAgents Thunk:", err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const addAgent = createAsyncThunk(
  "admin/addAgent",
  async ({agentData, update, addNew, aId}, { rejectWithValue }) => {
    try {
      const response = await addNewAgent(agentData, update, addNew, aId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAgentData = createAsyncThunk(
  "admin/deleteAgent",
  async (userId, { rejectedValue }) => {
    try {
      // const response =await deleteAgent(userId);
        await deleteAgent(userId);
      return userId;
      // return response;
    } catch (error) {
      return rejectedValue(error.response.data);
    }
  }
);

export const cancelPolicyData = createAsyncThunk(
  "admin/cancelPolicyData",
  async (policyId, { rejectedValue }) => {
    try {
      const response = await cancelPolicy(policyId);
      return response;
    } catch (error) {
      return rejectedValue(error.response.data);
    }
  }
);

export const fetchCancelledPolicy = createAsyncThunk(
  "admin/fetchCancelledPolicy",
  async ({page, limit}, { rejectedValue }) => {
    try {
      const response = await getCancelPolicy(page, limit);
      return response;
    } catch (error) {
      return rejectedValue(error.response.data);
    }
  }
);
export const fetchAllPolicy = createAsyncThunk(
  'admin/fetchAllPolicy',
  async ({ page , limit , manufacturer, searchTerm }, { rejectWithValue }) => {
    try {
      const response = await getAllPolicy(page, limit, manufacturer, searchTerm);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchInvoices = createAsyncThunk(
  'admin/fetchInvoices',
  async ({page, perPage}, { rejectWithValue }) => {
    try {
      const response = await getAllInvoice(page, perPage);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchInvoiceByStatus = createAsyncThunk(
  'admin/fetchInvoiceByStatus',
  async ({page, perPage, invoiceType, search, createdBy}, { rejectWithValue }) => {
    try {
      const response = await getAllInvoiceByStatus(page, perPage, invoiceType, search, createdBy);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchTeamMembers = createAsyncThunk(
  'admin/fetchTeamMembers',
  async ({toggle}, { rejectWithValue }) => {
    try {
      const response = await getTeamMember(toggle);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    mbAgents: [],
    mgAgents: [],
    newAgent: [],
 
    cancelPolicyData: [],
    deleteAgent: [],
    fetchCancelledData: {
      data: [], 
      currentPage: 1,
      
      totalPoliciesCount: 0,
      totalPagesCount: 1
    },
    allPolicy: {
      data: [], 
      currentPage: 1,
      
      totalPoliciesCount: 0,
      totalPagesCount: 1
    },
    invoices: [],
    invoicesByStatus:[],
    TeamMembers: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMbAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMbAgents.fulfilled, (state, action) => {
        state.mbAgents = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllMbAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllMgAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMgAgents.fulfilled, (state, action) => {
        state.mgAgents = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllMgAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAgent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newAgent.push(action.payload);
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAgentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAgentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action.payload;
        state.mbAgents = state.mbAgents.filter(agent => agent._id !== deletedId);
        state.mgAgents = state.mgAgents.filter(agent => agent._id !== deletedId);
      })
      .addCase(deleteAgentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
    

      .addCase(cancelPolicyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelPolicyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cancelPolicyData.push(action.payload);
      })
      .addCase(cancelPolicyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCancelledPolicy.pending, (state) => {
        state.status = "loading";
      })
       .addCase(fetchCancelledPolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchCancelledData = {
    
          data: action.payload, 
          currentPage: action.payload.currentPage,
          totalPages: action.payload.lastPage,
          totalPagesCount: action.payload.totalPagesCount, 
          totalPoliciesCount: action.payload.totalPoliciesCount,
        };
      })
      .addCase(fetchCancelledPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
       .addCase(fetchAllPolicy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPolicy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPolicy = {
    
          data: action.payload, 
          currentPage: action.payload.currentPage,
          totalPages: action.payload.lastPage,
          totalPagesCount: action.payload.totalPagesCount, 
          totalPoliciesCount: action.payload.totalPoliciesCount,
        };
      })
      .addCase(fetchAllPolicy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.allPolicy = {
          data: [], 
         
        }
      })
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices = action.payload
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchInvoiceByStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoiceByStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoicesByStatus = action.payload;
      })
      .addCase(fetchInvoiceByStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTeamMembers.pending, (state) => {
        state.status = "loading"; // Ensure this is distinct from fetchInvoiceByStatus
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.TeamMembers = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.TeamMembers = null;
      });
    },
});

export default adminSlice.reducer;
