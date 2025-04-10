import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://a33164-ad9f.k.d-f.pw/api/account';

export const isUserAuth = createAsyncThunk(
    'user/isUSerAuth',
    async (data: string | null, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                data;
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              };

            const response = await axios.get(`${API_URL}/IsUserAuthorised`, {headers });
            if (response) {
                return true;
              }
        } catch (error: any) {
            return rejectWithValue(false);
        }
    }
);