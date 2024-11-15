import React, { createContext, useContext } from "react";
import TrackManager from "../../../wwwroot/js/trackManager";

const trackManager = new TrackManager();

const TrackManagerContext = createContext(trackManager);

export const useTrackManager = () => useContext(TrackManagerContext);

export default TrackManagerContext;