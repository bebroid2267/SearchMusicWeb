import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultState } from "./albumSlice";
import { fetchLikedTracks, searchAlbums, searchArtists, searchTracks } from "./Middleware/fetchDataPage";

const initialState = {
    tracks: [],
    album: [],
    artist: [],
    likedTracks: []
}
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(searchTracks.fulfilled, (state, action: PayloadAction<any>) => {
            state.tracks = action.payload;
        });
        builder.addCase(searchAlbums.fulfilled, (state, action: PayloadAction<any>) => {
            state.album = action.payload;
        });
        builder.addCase(searchArtists.fulfilled, (state, action: PayloadAction<any>) => {
            state.artist = action.payload;
        });
        builder.addCase(fetchLikedTracks.fulfilled, (state, action: PayloadAction<any>) => {
            state.likedTracks = action.payload;
        })
    }
});

export const selectTracks = (state: any) => state.data.tracks;
export const selectAlbums = (state: any) => state.data.album;
export const selectArtists = (state: any) => state.data.artist;
export const selectLikedTracks = (state: any) => state.data.likedTracks;

export default dataSlice.reducer;