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
        setCurrentUrlWitoutFetch: (state: any, action: PayloadAction<string>) => {
            state.url = action.payload;
        }
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

export const { setCurrentUrlWitoutFetch } = tracksSlice.actions;
export default tracksSlice.reducer;