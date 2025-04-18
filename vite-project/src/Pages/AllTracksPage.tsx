import { motion } from "framer-motion"
import { RootState } from "../store/store";
import Tracks from "../customComponents/tracks";
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/site.css';
import '../../../wwwroot/css/favoritespage.css'
import '../../../wwwroot/css/allTracksPage.css'
import photo from "../../lib/resources/kandinsky-download-1744993894454.png"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectQuearyUser } from "../store/searchDataSlice";



export default function AllTracksPage () {
    const quearyUser = useSelector(selectQuearyUser);
    const results: any = useSelector<RootState>(state => state.data);
    const {tracks} = results;

    useEffect(() => {

    });

    return (
        <div className="intro">
        <div className="intro_result">
        <div className="artist-page-container">
        <motion.div 
            initial={{opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.1 }}
        >
                <div className="alltracks-header-info">
                        <div className="inline-container-tracks">
                            <div className="info-container">
                            <p className="album-article">{`Поиск для "${quearyUser}"`}</p>
                            <p className="all-tracks-article-album">Все треки</p>
                        </div>
                            <img 
                                className="album-cover-tracks" 
                                src={photo} 
                                alt="обложка артиста" 
                            />
                        </div>
                    </div>
                <div className="artist-container">
                    <div className="results">
                        <Tracks 
                            handleOpenTracks={null}
                            tracks={tracks} 
                            className={'artistTracks-ul'} 
                            classNameForTrackText={'artist-page-tracks-h2'} 
                            neededBtn={false}
                            currentPage={'result'}
                        />
                        <div className="pusto-div"></div>
                    </div>
                </div>
                </motion.div>
            </div>
        </div>
    </div>

    );
}