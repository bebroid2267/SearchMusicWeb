import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const API_URL = 'https://localhost:44303/api/account';

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const isUserAuthorised = async () => {
  try {
    const response = await axios.get(`${API_URL}/isAuthorised`);
    if (response) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const isUserAuth = await isUserAuthorised();
  if (isUserAuth) {
    try {
      const decodedToken = jwtDecode<JwtPayload & { email: string }>(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
