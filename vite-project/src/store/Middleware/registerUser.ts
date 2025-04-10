import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://a33164-ad9f.k.d-f.pw/api/account';

export type propForRegister = {
    email: string,
    password: string
}
export const registerUser = createAsyncThunk(
    'user/register',
    async (data: propForRegister, { rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/register`, data );
            return true;
        } catch (error: any) {
            return rejectWithValue(false);
        }
    }
);