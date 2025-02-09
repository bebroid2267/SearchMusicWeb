import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../Interfaces";
import { dislikeTrack, likeTrack } from "./Middleware/likeTrack";
import { isLikedTrack } from "./Middleware/isLikedTrack"

const initialTrack: ITrack = {
    id: '0',
    coverPath: 'test',
    title: 'test',
    artist: 'test',
    downloadUrl: 'test',
    album: null,
    artistEntity: null
}
const playerSlice = createSlice({
    name: 'player',
    initialState: {
        currentTrack: initialTrack,
        isCurrentTrackLiked: false,
        playlist: [] as ITrack[],
        isPlaying: false,
    },
    reducers: {
        setCurrentTrack: (state: any, action: PayloadAction<ITrack>) => {
            state.currentTrack = action.payload;
            state.isCurrentTrackLiked = false;
        },
        setPlaylist: (state: any, action: PayloadAction<ITrack[]>) => {
            state.playlist = action.payload;
        },
        setActualDownloadUrlPlaylist: (state: any, action: PayloadAction<{ neededTrack: ITrack, url: string }>) => {
            const updatedPlaylist = state.playlist.map((track: ITrack) =>
                track.id === action.payload.neededTrack.id ? { ...track, downloadUrl: action.payload.url }
                    : track
            );
            state.playlist = updatedPlaylist;
            state.currentTrack = updatedPlaylist.find((track: ITrack) => track.id === action.payload.neededTrack.id) || null;
        },
        setIsPlay: (state: any, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likeTrack.fulfilled, (state, action: PayloadAction<any>) => {
            state.isCurrentTrackLiked = action.payload;
        });
        builder.addCase(dislikeTrack.fulfilled, (state, action: PayloadAction<any>) => {
            state.isCurrentTrackLiked = action.payload;
        });
        builder.addCase(isLikedTrack.fulfilled, (state, action: PayloadAction<any>) => {
            state.isCurrentTrackLiked = action.payload;
        });
    },
});

const selectPlayer = (state: any) => state.player; // Ваш редьюсер player


export const selectCurrentTrack = (state: any) => state.player.currentTrack;
export const selectPlaylist = (state: any) => state.player.playlist;
export const selectIsTrackLiked = (state: any) => state.player.isCurrentTrackLiked;
export const selectIsPlaying = (state: any) => state.player.isPlaying;

export const { setCurrentTrack, setPlaylist, setActualDownloadUrlPlaylist, setIsPlay} = playerSlice.actions;
export default playerSlice.reducer;