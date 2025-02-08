import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTrack, selectCurrentTrackMemo, selectPlaylist, selectPlaylistMemo, setActualDownloadUrlPlaylist, setCurrentTrack } from "../store/playerSlice";
import { ITrack } from "../Interfaces";
import { fetchUrl } from "../store/Middleware/fetchUrlForTrack";
import { AppDispatch } from "../store/store";
import { useEffect, useMemo, useRef } from 'react';

export const usePlayerManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const playlist = useSelector(selectPlaylist);
    const currentTrack = useSelector(selectCurrentTrack);
    const dataPlaylistRef = useRef<ITrack[]>(null);


    const changeTrackPanel = (track: ITrack) => {
        dispatch(setCurrentTrack(track));
        if (!track.downloadUrl){
            dispatch(fetchUrl(track.id));
        }
    };

     const getIndexCurrentTrack = (track: ITrack, playlist: ITrack[]): number => {
        console.log(dataPlaylistRef.current);
        if (dataPlaylistRef.current) {
            for (let i = 0; i < dataPlaylistRef.current.length; i++) {
                if (dataPlaylistRef.current[i].id === track.id) {
                    return i;
                }
            }
        }
        return -1;
    }

    const nextTrack = (): void => {
        console.log('pered if');
        if (currentTrack !== null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack, playlist);
            if (playlist !== null) {
                console.log(indexCurrentTrack);
                if (indexCurrentTrack === playlist.length - 1) {
                    changeTrackPanel(playlist[0]);
                } else {
                    changeTrackPanel(playlist[indexCurrentTrack + 1]);
                }
            }
        }
    };

    const prevTrack = (): void => {
        if (playlist != null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack, playlist);

            if (playlist !== null) {
                if (indexCurrentTrack === 0) {
                    changeTrackPanel(playlist[playlist.length - 1]);
                } else {
                    changeTrackPanel(playlist[indexCurrentTrack - 1]);
                }
            }
        }
    }

    return {
        changeTrackPanel,
        nextTrack,
        prevTrack,
    };
}