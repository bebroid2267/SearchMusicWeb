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
    artists: IArtist[] | null;
    artistsName: string[],
    isPending: boolean,
}

export const initialState: IAlbumState = {
    tracks: null,
    album: null,
    artists: [],
    artistsName: [],
    isPending: false,
};

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setArtistName: (state: any, action: PayloadAction<string[]>) => {
            state.artistsName = action.payload;
        },
        setAlbum: (state: any, action: PayloadAction<IAlbum>) => {
            state.album = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracksAlbum.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload;
            state.isPending = false;

            if (state.tracks) {
                let foundArtist: IArtist[] | null = [];
                for (const track of state.tracks) {
                    console.log(track?.artistsEntity);
                    if (track?.artistsEntity) {
                        var artist = track.artistsEntity.find(artist =>
                            state.artistsName.includes(artist.name)
                        );
                        console.log(artist);
                        if (artist)
                        foundArtist.push(artist);

                        if (foundArtist) break;
                    }
                }
                state.artists = foundArtist;
            }
    });
        
    builder.addCase(fetchTracksAlbum.pending, (state) => {
        state.isPending = true;
    });

    },
})

export const { setArtistName, setAlbum } = albumSlice.actions;
export default albumSlice.reducer;