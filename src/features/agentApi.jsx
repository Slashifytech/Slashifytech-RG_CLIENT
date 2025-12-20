import apiurl from "../utils";

export const getAllApprovalsList = async (page, perPage, userId) => {
  try {
    const response = await apiurl.get("/agent-document-approval", null, {
      params: {
        page: page,
        limit: perPage,
        userId: userId
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in fetching all policies:", error);
    throw error;
  }
};

export const resubmitPolicy = async(policyId) =>{
  try{
   const response = await apiurl.patch('/policy-resubmit',{},{
    params:{
     policyId: policyId,
  
    }
   })

   return response.data;
  }catch(error){
    console.log("Error:", error);
     throw error
  }
}

