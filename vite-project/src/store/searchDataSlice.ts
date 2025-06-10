import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLikedTracks, searchAlbums, searchArtists, searchTrackPage, searchTracks, searchAlbumPage, searchArtistPage } from "./Middleware/fetchDataPage";
import { ITrack, IAlbum, IArtist } from "../Interfaces";

const initialState = {
    tracks: [] as ITrack[],
    album: [] as IAlbum[],
    artist: [] as IArtist[],
    likedTracks: [],
    queary: '',
    isLastTracksScroll: false,
    isLastAlbumsScroll: false,
    isLastArtistsScroll: false,
    isPending: false
}
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setQuearyUser: (state: any, action: PayloadAction<string>) =>{
            state.queary = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchTracks.fulfilled, (state, action: PayloadAction<any>) => {
            state.tracks = action.payload || [];
            state.isLastTracksScroll = false;
            state.isPending = false;
        });
        builder.addCase(searchTracks.pending, (state) => {
            state.isPending = true;
        });

        builder.addCase(searchTrackPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newTracks = action.payload || [];
        
            // Удаление дубликатов
            const uniqueTracks = [...state.tracks, ...newTracks].filter((track, index, self) =>
                index === self.findIndex((t) => (
                t.id === track.id
                ))
            );
              
            state.tracks = uniqueTracks;
        });
        builder.addCase(searchTrackPage.rejected, (state) => {
            state.isLastTracksScroll = true;
            state.isPending = false;
        });
        
        builder.addCase(searchAlbums.fulfilled, (state, action: PayloadAction<any>) => {
            state.album = action.payload || [];
            state.isLastAlbumsScroll = false;
        });
        builder.addCase(searchAlbums.rejected, (state) => {
            state.album = [];
            state.isLastAlbumsScroll = true;
        });

        builder.addCase(searchAlbumPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newAlbums = action.payload || [];
        
            // Удаление дубликатов
            const uniqueAlbums = [...state.album, ...newAlbums].filter((album, index, self) =>
                index === self.findIndex((a) => (
                a.id === album.id
                ))
            );
              
            state.album = uniqueAlbums;
        });
        builder.addCase(searchAlbumPage.rejected, (state) => {
            state.isLastAlbumsScroll = true;
        });

        builder.addCase(searchArtists.fulfilled, (state, action: PayloadAction<any>) => {
            state.artist = action.payload || [];
            state.isLastArtistsScroll = false;
        });
        builder.addCase(searchArtists.rejected, (state) => {
            state.artist = [];
            state.isLastArtistsScroll = true;
        });

        builder.addCase(searchArtistPage.fulfilled, (state, action: PayloadAction<any>) => {
            const newArtists = action.payload || [];
        
            // Удаление дубликатов
            const uniqueArtists = [...state.artist, ...newArtists].filter((artist, index, self) =>
                index === self.findIndex((a) => (
                a.id === artist.id
                ))
            );
              
            state.artist = uniqueArtists;
        });
        builder.addCase(searchArtistPage.rejected, (state) => {
            state.isLastArtistsScroll = true;
        });

        builder.addCase(fetchLikedTracks.fulfilled, (state, action: PayloadAction<any>) => {
            state.likedTracks = action.payload || [];
        })
    }
});

export const selectTracks = (state: any) => state.data.tracks;
export const selectAlbums = (state: any) => state.data.album;
export const selectArtists = (state: any) => state.data.artist;
export const selectLikedTracks = (state: any) => state.data.likedTracks;
export const selectQuearyUser = (state: any) => state.data.queary;

export const {setQuearyUser} = dataSlice.actions;
export default dataSlice.reducer;