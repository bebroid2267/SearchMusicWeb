import React, { createContext, useContext } from 'react';
import TrackManager from '../managers/trackManager';
import ArtistManager from '../managers/ArtistManager';
import { usePlayerManager } from '../customHooks/usePlayerManager';
import { ITrack } from '../Interfaces';

interface TrackManagerContextType {
  trackManager: TrackManager;
  changeTrackPanel: (track: ITrack) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}
// Создаем контекст
export const TrackManagerContext = createContext<TrackManagerContextType | null>(null);

// Провайдер для контекста
export const TrackManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const trackManager = new TrackManager();
  const playerManager = usePlayerManager();

  const contextValue: TrackManagerContextType = {
    trackManager,
    ...playerManager,
  };

  return (
    <TrackManagerContext.Provider value={contextValue}>
      {children}
    </TrackManagerContext.Provider>
  );
};

// Хук для использования контекста
export const useTrackManager = () => {
  const context = useContext(TrackManagerContext);
  if (!context) {
    throw new Error(
      'useTrackManager must be used within a TrackManagerProvider'
    );
  }
  return context;
};

export const ArtistManagerContext = createContext<ArtistManager | null>(null);

export const ArtistManagerProvider = ({
  children,

}: {
  children: React.ReactNode;
}) => {

  const artistManger = new ArtistManager();

  return (
    <ArtistManagerContext.Provider value={artistManger}>
      {children}
    </ArtistManagerContext.Provider>
  )
};

export const useArtistManager = () => {
  const context = useContext(ArtistManagerContext);
  if (!context) {
    throw new Error(
      'useArtistManager must be used within a ArtistManagerProvider'
    );
  }
  return context;
};