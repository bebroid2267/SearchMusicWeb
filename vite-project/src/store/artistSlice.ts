import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";
import { fetchAlbumsArtist, fetchTracksArtist, fetchTracksArtistPage } from "./Middleware/fetchDataPage";

const initialArtist: IArtist = {
    id: '0',
    coverPath: '',
    name: ''
}
const initialState = {
    tracks: [] as ITrack[],
    albums: [] as IAlbum[],
    artist: initialArtist,
    isLastTracksScroll: false,
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
            state.isLastTracksScroll = false;
        });

        builder.addCase(fetchTracksArtistPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newTracks = action.payload;

            // Удаление дубликатов
            const uniqueTracks = [...state.tracks, ...newTracks].filter((track, index, self) =>
              index === self.findIndex((t) => (
                t.id === track.id
              ))
            );
      
            state.tracks = uniqueTracks;
        });
        builder.addCase(fetchTracksArtistPage.rejected, (state) => {
            state.isLastTracksScroll = true;
        });

    }
})
export const selectCurrentArtist = (state: any) => state.artist.artist;
export const { setArtist } = artistSlice.actions;
export default artistSlice.reducer;