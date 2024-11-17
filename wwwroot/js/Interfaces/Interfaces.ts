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
    id: number;
    coverPath: string;
    title: string;
    artist: string;
    downloadUrl: string;
}

export interface IArtist {
    id: number;
    coverPath: string;
    name: string;
}

export interface IAlbum {
    id: number;
    coverPath: string;
    title: string;
    year: string;
    artistName: string;
}