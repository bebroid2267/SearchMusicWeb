import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTrack, selectPlaylist, setActualDownloadUrlPlaylist, setCurrentTrack } from "../store/playerSlice";
import { ITrack } from "../Interfaces";
import { fetchUrl } from "../store/Middleware/fetchUrlForTrack";
import { AppDispatch } from "../store/store";

export const usePlayerManager = () => {
    const dispatch = useDispatch<AppDispatch>();
    const playlist = useSelector(selectPlaylist);
    const currentTrack = useSelector(selectCurrentTrack);

    const changeTrackPanel = (track: ITrack) => {
        dispatch(setCurrentTrack(track));
        if (!track.downloadUrl){
            dispatch(fetchUrl(track.id));
        }
    };

     function getIndexCurrentTrack(track: ITrack): number {
        if (playlist !== null) {
            for (let i = 0; i < playlist.length; i++) {
                if (playlist[i].id == track.id) {
                    return i;
                }
            }
        }
        return -1;
    }

    const nextTrack = (): void => {
        if (currentTrack !== null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack);

            if (playlist !== null) {
                if (indexCurrentTrack === playlist.length - 1) {
                    changeTrackPanel(playlist[0]);
                } else {
                    changeTrackPanel(playlist[indexCurrentTrack + 1]);
                }
            }
        }
    };

    const prevTrack = (): void => {
        if (currentTrack != null) {
            const indexCurrentTrack = getIndexCurrentTrack(currentTrack);

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