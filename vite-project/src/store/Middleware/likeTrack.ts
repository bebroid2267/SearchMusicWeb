import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../Interfaces";

const API_URL = 'https://a33164-ad9f.k.d-f.pw/api/tracksLike';

export const likeTrack = createAsyncThunk(
    'player/likeTrack',
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
                `${API_URL}/${track.id}/like?track=${encodeURIComponent(JSON.stringify(track))}`,
                { headers, method: 'POST' }
              );
              return response.ok === true;
        } catch (error: any) {
            return rejectWithValue(false);
        }
    }
);

export const dislikeTrack = createAsyncThunk(
    'player/dislikeTrack',
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
              const response = await fetch(`${API_URL}/${track.id}/like`, { headers, method: 'DELETE' });
              return response.ok === false;
        } catch (error: any) {
            return rejectWithValue(true);
        }
    }

);