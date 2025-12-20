import apiurl from '../utils';

export const signinUser = async (email, password ) => {
  try {
    
    const response = await apiurl.post('/auth', { email, password });
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response.data.message;
  }
};
