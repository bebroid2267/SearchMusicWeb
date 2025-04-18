import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUrl = createAsyncThunk(
    'tracks/fetchUrl',
    async (chooseTrackId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://localhost:44303/Home/GetUrlForTrack?trackId=${chooseTrackId}`,
             {method: 'GET'});
            const data = await response.text();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);