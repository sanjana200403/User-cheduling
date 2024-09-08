// src/api/userApi.ts
import axios from "axios";
interface UserCredentials {
  email: string;
  password: string;
  role?: string;
}

export const registerUser = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(`http://localhost:4000/register`, credentials);
    return response.data;
  } catch (error:any) {
    console.log(error)
   return  error.response?.data.message
  }
};

export const loginUser = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post('http://localhost:4000/login', credentials);
    return response.data;
  } catch (error:any) {
    console.log(error)
    return  error.response?.data.message
  }
};
