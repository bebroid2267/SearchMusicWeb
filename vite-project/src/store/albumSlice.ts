import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";
import { fetchTracksAlbum } from "./Middleware/fetchDataPage";

interface Tracks {
    trackList: ITrack[];
}
export interface ResultState {
    tracks: Tracks | null;
    album: IAlbum | null;
    artist: IArtist | null;
}

export interface IAlbumState {
    tracks: ITrack[] | null;
    album: IAlbum | null;
    artist: IArtist | null;
    artistName: string,
}

export const initialState: IAlbumState = {
    tracks: null,
    album: null,
    artist: null,
    artistName: ''
};

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setArtistName: (state: any, action: PayloadAction<string>) => {
            state.artistName = action.payload;
        },
        setAlbum: (state: any, action: PayloadAction<IAlbum>) => {
            state.album = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracksAlbum.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload;

            if (state.tracks) {
                for (const track of state.tracks) {
                    if (track && track.artistEntity && track.artistEntity.name === state.artistName) {
                        state.artist = track.artistEntity;
                        break;
                    }            
                }    
            }
        });
    },
})

export const { setArtistName, setAlbum } = albumSlice.actions;
export default albumSlice.reducer;