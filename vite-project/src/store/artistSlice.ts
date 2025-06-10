import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum, IArtist, ITrack } from "../Interfaces";
import { fetchAlbumsArtist, fetchTracksArtist, fetchTracksArtistPage, fetchAlbumsArtistPage } from "./Middleware/fetchDataPage";

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
    isLastAlbumsScroll: false,
    isPending: false,
    isAlbumsPending: false
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action: PayloadAction<IArtist>) => {
            state.artist = action.payload;
            // Сброс состояния при смене артиста
            state.albums = [];
            state.tracks = [];
            state.isLastAlbumsScroll = false;
            state.isLastTracksScroll = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAlbumsArtist.pending, (state) => {
            state.isAlbumsPending = true;
        });

        builder.addCase(fetchAlbumsArtist.fulfilled, (state, action: PayloadAction<any>) => {
            state.albums = action.payload || [];
            state.isLastAlbumsScroll = false;
            state.isAlbumsPending = false;
        });

        builder.addCase(fetchAlbumsArtist.rejected, (state) => {
            state.albums = [];
            state.isLastAlbumsScroll = true;
            state.isAlbumsPending = false;
        });

        builder.addCase(fetchTracksArtist.fulfilled, (state, action: PayloadAction<any>) => {
            state.tracks = action.payload || [];
            state.isLastTracksScroll = false;
            state.isPending = false;
        });

        builder.addCase(fetchTracksArtist.pending, (state) => {
            state.isPending = true;
        });

        builder.addCase(fetchTracksArtistPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newTracks = action.payload || [];

            if (!newTracks.length) {
                state.isLastTracksScroll = true;
                return;
            }

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
            state.isPending = false;
        });

        builder.addCase(fetchAlbumsArtistPage.pending, (state) => {
            state.isAlbumsPending = true;
        });

        builder.addCase(fetchAlbumsArtistPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newAlbums = action.payload || [];

            if (!newAlbums.length) {
                state.isLastAlbumsScroll = true;
                return;
            }

            // Удаление дубликатов
            const uniqueAlbums = [...state.albums, ...newAlbums].filter((album, index, self) =>
              index === self.findIndex((a) => (
                a.id === album.id
              ))
            );
      
            state.albums = uniqueAlbums;
            state.isAlbumsPending = false;
        });

        builder.addCase(fetchAlbumsArtistPage.rejected, (state) => {
            state.isLastAlbumsScroll = true;
            state.isAlbumsPending = false;
        });
    }
})

export const selectIsPendingTracksArtist = (state: any) => state.artist.isPending;
export const selectIsAlbumsPendingArtist = (state: any) => state.artist.isAlbumsPending;
export const selectCurrentArtist = (state: any) => state.artist.artist;
export const { setArtist } = artistSlice.actions;
export default artistSlice.reducer;