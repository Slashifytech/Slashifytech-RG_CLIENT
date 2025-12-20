import apiurl from "../utils";

export const getDocumentData = async (page, perPage, search) => {
  try {
    const res = await apiurl.get("/all-document", {
      params: {
        page: page,
        limit: perPage,
        searchTerm: search,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while fetching Data"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateStatus = async (
  invoiceId,
  policyId,
  customerName,
  agentId,
  agentApproval,
  clientApproval,

  message,
  email
) => {
  try {
    const res = await apiurl.patch("/document-status-update", {
      invoiceId: invoiceId,
      policyId: policyId,
      customerName: customerName,
      agentId: agentId,
      userId: agentId,
      clientApproval: clientApproval,
      agentApproval: agentApproval,
      message: message,
      email: email,
    });

    return res.data;
  } catch (error) {
    // Improved error logging
    console.error("Error updating status:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
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

export const approvalByCustomer = async (clientApproval, email) => {
  try {
    const res = await apiurl.patch("/customer-approval", {
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
