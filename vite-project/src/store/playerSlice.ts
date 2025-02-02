import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../Interfaces";

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
        playlist: [] as ITrack[],
    },
    reducers: {
        setCurrentTrack: (state: any, action: PayloadAction<ITrack>) => {
            state.currentTrack = action.payload;
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
        }
    }
});

export const selectCurrentTrack = (state: any) => state.player.currentTrack;
export const selectPlaylist = (state: any) => state.player.playlist;

export const { setCurrentTrack, setPlaylist, setActualDownloadUrlPlaylist} = playerSlice.actions;
export default playerSlice.reducer;