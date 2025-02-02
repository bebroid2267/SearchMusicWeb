import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";

interface Tracks {
    trackList: ITrack[];
}
export interface ResultState {
    tracks: Tracks | null;
    albums: IAlbum | null;
    artist: IArtist | null;
}

export const initialState: ResultState = {
    tracks: null,
    albums: null,
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
        updateTrackDownloadUrl: (state: any, action: { payload: any}) => {
            state.tracks = state.tracks.map((t: any) => (t.id === action.payload.id ? 
                { ...t, downloadUrl: action.payload.downloadUrl }
                : t));
        },
    }
})

export const { setAlbumPage, updateTrackDownloadUrl } = albumSlice.actions;
export default albumSlice.reducer;