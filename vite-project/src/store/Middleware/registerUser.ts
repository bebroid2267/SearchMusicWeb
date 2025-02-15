import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://localhost:44303/api/account';

export type propForRegister = {
    email: string,
    password: string
}
export const registerUser = createAsyncThunk(
    'user/register',
    async (data: propForRegister, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/register`, data );
            return true;
        } catch (error: any) {
            return rejectWithValue(false);
        }
    }
);