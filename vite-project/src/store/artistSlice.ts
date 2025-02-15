import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";
import { fetchAlbumsArtist, fetchTracksArtist } from "./Middleware/fetchDataPage";

const initialArtist: IArtist = {
    id: '0',
    coverPath: '',
    name: ''
}
const initialState = {
    tracks: [] as ITrack[],
    albums: [] as IAlbum[],
    artist: initialArtist
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action: PayloadAction<IArtist>) => {
            state.artist = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsArtist.fulfilled, (state, action: PayloadAction<any>) => {
            state.albums = action.payload;
        });
        builder.addCase(fetchTracksArtist.fulfilled, (state, action: PayloadAction<any>) => {
            state.tracks = action.payload;
        });
    }
})

export const { setArtist } = artistSlice.actions;
export default artistSlice.reducer;