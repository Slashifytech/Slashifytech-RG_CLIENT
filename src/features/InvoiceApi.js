import apiurl from "../utils";

export const getInvoiceById = async(invoiceId) =>{
    try{
     const response = await apiurl.get('/invoice',{
      params:{
       invoiceId: invoiceId,
    
      }
     })
  
     return response.data;
    }catch(error){
      console.log("Error in fetching all policies:", error);
       throw error
    }
  }


  export const reSubmitInvoice = async(invoiceId) =>{
    try{
     const response = await apiurl.patch('/invoice-resubmit',{},{
      params:{
       invoiceId: invoiceId,
    
      }
     })
  
     return response.data;
    }catch(error){
      console.log("Error:", error);
       throw error
    }
  }

  