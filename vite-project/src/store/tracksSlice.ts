import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUrl } from "./Middleware/fetchUrlForTrack";

const initialState = {
    url: '',
    loading: false,
    error: null,
};

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUrl.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUrl.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.url = action.payload;
        });
        builder.addCase(fetchUrl.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { } = tracksSlice.actions;
export default tracksSlice.reducer;