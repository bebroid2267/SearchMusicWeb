export interface ITrackManager {
    isPlaying: boolean;
    resultTracks: [];
    trackForUrl: HTMLAudioElement;
    playTrackBtn: HTMLButtonElement;
    currentTrack: ITrack;
    trackArtistPanel: HTMLHeadingElement;
    trackTitlePanel: HTMLParagraphElement;
    imgForGradient: HTMLImageElement;
}

export interface ITrack {
    id: string;
    coverPath: string;
    title: string;
    artist: string;
    downloadUrl: string;
    artistEntity: IArtist | null;
    album: IAlbum | null;
}

export interface IArtist {
    id: string;
    coverPath: string;
    name: string;
}

export interface IAlbum {
    id: string;
    coverPath: string;
    title: string;
    year: string;
    artistName: string;
}