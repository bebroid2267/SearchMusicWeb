import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { propForRegister } from "./registerUser";

const API_URL = 'https://a34295-0341.w.d-f.pw/api/account';

export const loginUser = createAsyncThunk(
    'user/login',
    async (data: propForRegister, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return true;
        } catch (error: any) {
            return rejectWithValue(false);
        }
    }
);