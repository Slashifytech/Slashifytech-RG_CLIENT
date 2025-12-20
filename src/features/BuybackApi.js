import apiurl from "../utils";

export const addNewBuyBack = async (payload) => {
  try {
    const response = await apiurl.post("/add-new-buy-back", payload);

    return response.data;
  } catch (error) {
    console.log("Error in Adding Buy Back:", error);
    throw error;
  }
};

export const updateBuyBack = async (payload, id) => {
  try {
    const response = await apiurl.patch(`/edit-buy-back/${id}`, payload);

    return response.data;
  } catch (error) {
    console.log("Error in Adding Buy Back:", error);
    throw error;
  }
};

export const getBuyBackById = async (id, status) => {
  try {
    const response = await apiurl.get(`/buy-back`, {
      params: {
        id: id,
        status: status,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in Adding Buy Back:", error);
    throw error;
  }
};

export const getAllBuyBackLists = async (
  page,
  perPage,
  searchTerm,
  userId,
  status
) => {
  try {
    const response = await apiurl.get(`/buy-back-lists`, {
      params: {
        id: userId,
        status: status,
        search: searchTerm,
        page: page,
        perPage: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in Adding Buy Back:", error);
    throw error;
  }
};
export const updatBuyBackStatus = async (buybackId, type, reason) => {
  try {
    const response = await apiurl.patch(
      "/update-buyback-status",
      {
        id: buybackId,
        type: type,
      },
      {
        params: {
          reason: reason,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting policy data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const buyBackResubmit = async (id) => {
  try {
    const response = await apiurl.patch(`/buyback-resubmit`,null, {
      params: {
        buyBackId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in resubmitting Buy Back:", error);
    throw error;
  }
};

export const buyBackCancelByAdmin = async (id) => {
  try {
    const response = await apiurl.patch(`/disable-buyBack`,null, {
      params: {
        buyBackId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in cancellation Buy Back:", error);
    throw error;
  }
};
