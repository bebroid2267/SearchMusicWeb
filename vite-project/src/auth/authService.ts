import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const API_URL = 'https://localhost:44303/api/account';

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  console.log('login');
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getCurrentUser = () => {
  console.log('Fetching user from token...');
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found in localStorage');
    return null;
  }
  
  console.log('Token found:', token);

  try {
    // Расширяем тип JwtPayload, добавляя поле email
    const decodedToken = jwtDecode<JwtPayload & { email: string }>(token);
    console.log('Decoded token:', decodedToken);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
