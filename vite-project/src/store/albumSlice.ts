import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";


export interface ResultState {
    tracks: ITrack[];
    albums: IAlbum[];
    artist: IArtist | null;
}

const initialState: ResultState = {
    tracks: [],
    albums: [],
    artist: null,
};

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbumPage: (state: ResultState, action: { payload: ResultState}) => {
            state.tracks = action.payload.tracks;
            state.albums = action.payload.albums;
            state.artist = action.payload.artist
        },
    }
})

export const { setAlbumPage } = albumSlice.actions;
export default albumSlice.reducer;