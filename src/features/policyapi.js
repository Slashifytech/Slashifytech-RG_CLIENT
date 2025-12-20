import apiurl from "../utils";

export const editPolicyData = async (id, policyData, token, pId) => {
  try {
    const response = await apiurl.patch(
      `/edit-policies/${pId}`,
      { userId: id, ...policyData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error in editPolicyData:", error); // Log the error
    throw error; // Throw the error to propagate it
  }
};

export const submitPolicyData = async (userId, policyData, token, addNew, update, pId) => {
  try {
    const response = await apiurl.post(
      `/add-policies`,
      { userId, ...policyData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error in submitPolicyData:", error); // Log the error
    throw error; // Throw the error to propagate it
  }
};


export const getAllPendingPolicy = async (page = 1, limit = 10, manufacturer) => {
  try {
    const response = await apiurl.get("/pendingPolicy", {
      params: { page, limit, manufacturer},
    
    });
    console.log(manufacturer)

    return response.data;
  } catch (err) {
    console.log(err);
    throw err; 
  }
};

  export const updatePolicyStatus = async (policyId, type, policyData, reason) => {

    try {
      const response = await apiurl.put("/policyStatus", {
      id: policyId,
    type: type,
      ...policyData,
      },{
        params:{
          reason: reason
        }
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error submitting policy data:",
        error.response?.data || error.message
      );
      throw error;
    }
  };




  export const cancelRequest = async(id)=>{
    try{
      const response = await apiurl.put(`/cancel-request/${id}`)
         return response.data
    }catch(error){
      console.log(error, "Error while cancel request")
    }
     
  }

  export const policyData = async (page, perPage, search, policyStatus, userId) => {

    try {
      const response = await apiurl.get("/policy", 
   
      {
        params:{
          page: page,
          limit: perPage, 
          search: search,
          policyStatus: policyStatus,
          userId: userId
        }
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error submitting policy data:",
        error.response?.data || error.message
      );
      throw error;
    }
  };


  
