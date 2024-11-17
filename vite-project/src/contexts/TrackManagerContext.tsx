import React, { createContext, useContext } from "react";
import TrackManager from "../../../wwwroot/js/trackManager";

// Создаем контекст
export const TrackManagerContext = createContext<TrackManager | null>(null);

// Провайдер для контекста
export const TrackManagerProvider = ({ children }: { children: React.ReactNode }) => {
    const trackManager = new TrackManager();

    return (
        <TrackManagerContext.Provider value={trackManager}>
            {children}
        </TrackManagerContext.Provider>
    );
};

// Хук для использования контекста
export const useTrackManager = () => {
    const context = useContext(TrackManagerContext);
    if (!context) {
        throw new Error("useTrackManager must be used within a TrackManagerProvider");
    }
    return context;
};