import apiurl from "../src/utils";
import { getToken } from "./getToken";
import { jwtDecode } from "jwt-decode";
export const fetchUserById = async (userId) => {
  const token = getToken();
  try {
    const response = await apiurl.get(`/getUserDataById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCountPolicy = async () => {
  try {
    const response = await apiurl.get("/getPolicy-count");
    return response.data.count;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const getCancelledCountPolicy = async () => {
  try {
    const response = await apiurl.get("/getCancelledPolicy-count");
    return response.data.count;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const downloadCsvData = async (path) => {
  try {
    const response = await apiurl.get(`${path}`, {
      responseType: "blob",
 
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading CSV:", error);
  }
};
export const getPolicyById = async (id, page, limit) => {
  try {
    const response = await apiurl.get(`/policyById/${id}`,
        {
            params: {
                page,
                limit,
              },
        }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getFilteredPolicyById = async (id, page, limit) => {
  try {
    const response = await apiurl.get(`/filtered-policyById/${id}`,
        {
            params: {
                page,
                limit,
              },
        }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


export const fetchAllUserDataById = async (userId) => {
  const token = getToken();
  try {
    const response = await apiurl.get(`/getAllUserDataById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const decodeToken = (token) => {
  
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }
  
  try {
    const decodedData = jwtDecode(token);
    return decodedData; 
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export function addPercentageToNumber(percent, number) {
  const percentageValue = (percent / 100) * number;

  const result = number + percentageValue;

  return result;
}


