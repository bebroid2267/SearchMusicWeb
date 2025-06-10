import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUrl = createAsyncThunk(
    'tracks/fetchUrl',
    async (chooseTrackId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://a34295-0341.w.d-f.pw/Home/GetUrlForTrack?trackId=${chooseTrackId}`,
             {method: 'POST'});
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);