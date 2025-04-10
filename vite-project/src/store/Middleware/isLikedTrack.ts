import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../Interfaces";

const API_URL = 'https://a33164-ad9f.k.d-f.pw/api/tracksLike';

export const isLikedTrack = createAsyncThunk(
    'player/isLikedTrack',
    async (track: ITrack , { rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              };
              const response = await fetch(
                `${API_URL}/${track.id}/likedthis`,
                { headers, method: 'GET' }
              );
              console.log('возвращаем че то');
              return response.ok === true;
        } catch (error: any) {
            console.log('делаем false wtf');
            return rejectWithValue(false);
        }
    }
);
