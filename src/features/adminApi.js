import apiurl from "../utils";

export const getAllMbAgents = async () => {
  try {
    const response = await apiurl.get("/mb-agents");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllMgAgents = async () => {
  try {
    const response = await apiurl.get("/mg-agents");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updatePassword = async (payload) => {
  try {
    const response = await apiurl.patch("/password-update", payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateEmail = async (payload) => {
  try {
    const response = await apiurl.patch("/email-update", payload);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addNewAgent = async (agentData, update, addNew, aId) => {
  try {
    const response = await apiurl.post("/add-new-agent", agentData, {
      params: {
        update: update,
        isNew: addNew,
        id: aId,
      },
    });
    console.log("Agent added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding agent:", error);
    throw error;
  }
};

export const deleteAgent = async (userId) => {
  try {
    const response = await apiurl.delete(`/deleteAgent/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Error whle deleting agents", error);
  }
};

export const cancelPolicy = async (policyId) => {
  try {
    const response = await apiurl.put(`/cancelPolicy/${policyId}`);
    return response.data;
  } catch (error) {
    console.error("Error in cancelling policy:", error);
    throw error;
  }
};

export const getCancelPolicy = async (page, limit) => {
  try {
    const response = await apiurl.get("/get-cancelled-policy", {
      params: { page, limit },
    });
    console.log(response.data, "cab");
    return response.data;
  } catch (error) {
    console.log("Error in fetching cancelled policy:", error);
    throw error;
  }
};

export const getAllPolicy = async (page, limit, manufacturer, searchTerm) => {
  try {
    const response = await apiurl.get("/get-all-policy", {
      params: { page, limit, manufacturer, search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const addNewInovoice = async (payload, role) => {
  try {
    const response = await apiurl.post("/add-invoice", payload, role);
    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const editInovoice = async (payload, id) => {
  try {
    const response = await apiurl.patch("/update-invoice", payload, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const getAllInvoice = async (page, perPage) => {
  try {
    const response = await apiurl.get("/all-invoice-approval", null, {
      params: {
        page: page,
        limit: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const approvalStatusChange = async (
  invoiceId,
  approvalStatus,
  message
) => {
  try {
    const response = await apiurl.patch("/update-approval", null, {
      params: {
        invoiceId: invoiceId,
        approvalStatus: approvalStatus,
        message: message,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const getAllInvoiceByStatus = async (
  page,
  perPage,
  invoiceType,
  search,
  createdBy
) => {
  try {
    const response = await apiurl.get("/invoice-all", {
      params: {
        invoiceType: invoiceType,
        page: page,
        limit: perPage,
        searchTerm: search,
        createdBy: createdBy,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in fetching all invoices:", error);
    throw error;
  }
};

export const customerApprovalSend = async (
  invoiceId,
  policyId,
  customerName,
  clientApproval,
  email
) => {
  try {
    const res = await apiurl.patch("/customer-document-approval", {
      invoiceId: invoiceId,
      policyId: policyId,
      customerName: customerName,
      clientApproval: clientApproval,
      email: email,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while fetching data"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getTeamMember = async (brandName) => {
  try {
    const res = await apiurl.get("/team-members", {
      params: {
        brandName: brandName,
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while fetching data"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getDashboardData = async (
  path,
  location,
  vehicleModel,
  startDate,
  endDate
) => {
  try {
    const res = await apiurl.get(path, {
      params: {
        location: location,
        vehicleModel: vehicleModel,
        startDate: startDate,
        endDate: endDate,
      },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while fetching data"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
