import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const API_URL = 'https://a30895-8359.x.d-f.pw/api/account';

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

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload & { email: string }>(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
