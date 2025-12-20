import axios from "axios";
import { getToken } from "../Util/getToken";

export const apiurlOpen = axios.create({
  baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
});

const apiurl = axios.create({
  baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
});

apiurl.interceptors.request.use(
  (config) => {
    const tokenId = getToken(); 
   
    if (tokenId) {
      config.headers.Authorization = `Bearer ${tokenId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const apiurl = axios.create({
//   baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
//   // baseURimport { getToken } from './../Util/getToken';
L: "https://server.360carprotect.in/api/v1"

// });
export default apiurl;







