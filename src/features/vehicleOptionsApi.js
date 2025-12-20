import apiurl from "./../utils";

export const mgOptionData = async () => {
  try {
    const response = await apiurl.get("/mgOptions");

    return response.data?.mgOptions;
  } catch (error) {
    console.error("Error fetching mgOptions:", error.message); 
    throw error; 
  }
};

export const mbOptionData = async () => {
  try {
    const response = await apiurl.get("/mbOptions");

    return response.data?.mbOptions; 
  } catch (error) {
    console.error("Error fetching mbOptions:", error.message); 
    throw error;
  }
};
