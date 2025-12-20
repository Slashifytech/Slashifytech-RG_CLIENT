export const getToken = () => {
  try {
    const token = localStorage.getItem('userAuthToken');
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};