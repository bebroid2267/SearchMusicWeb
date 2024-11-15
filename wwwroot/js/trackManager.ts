import { ITrack } from "./Interfaces/Interfaces";
export default class TrackManager {
    isPlaying: boolean | null = null;
    resultTracks: ITrack[] | null = null;
    trackForUrl: HTMLAudioElement | null = null;
    playTrackBtn: HTMLImageElement | null = null;
    currentTrack: ITrack | null = null;
    trackArtistPanel: HTMLHeadingElement | null = null;
    trackTitlePanel: HTMLParagraphElement | null = null;
    imgForGradient: HTMLImageElement | null = null;

    constructor() {
        // Ищем элементы в DOM, если они уже существуют
        this.trackForUrl = document.querySelector('#track_for_url') as HTMLAudioElement | null;
        this.resultTracks = [];
        this.isPlaying = false;

        // Используем document.createElement для создания новых элементов, если они не существуют в DOM
        this.playTrackBtn = document.querySelector('#play-music-btn') as HTMLImageElement | null;
        this.imgForGradient = document.querySelector('#img-for-gradient') as HTMLImageElement | null;
        this.trackArtistPanel = document.querySelector('.track-artist-panel') as HTMLHeadingElement | null;
        this.trackTitlePanel = document.querySelector('.track-title-panel') as HTMLParagraphElement | null;

        // Если элементы не найдены в DOM, создаем их
        if (!this.trackForUrl) {
            this.trackForUrl = document.createElement('audio');
        }

        if (!this.playTrackBtn) {
            this.playTrackBtn = document.createElement('img');
        }

        if (!this.imgForGradient) {
            this.imgForGradient = document.createElement('img');
        }

        if (!this.trackArtistPanel) {
            this.trackArtistPanel = document.createElement('h1');
        }

        if (!this.trackTitlePanel) {
            this.trackTitlePanel = document.createElement('p');
        }

        // Пример установки тестового трека
        const track: ITrack = {
            id: 0,
            coverPath: 'test',
            title: 'test',
            artist: 'test',
            downloadUrl: 'test'
        };
        this.currentTrack = track;

        this.nextTrack = this.nextTrack.bind(this);
        this.prevTrack = this.prevTrack.bind(this);
    }

    playTrackClick(): void {
        if (!this.playTrackBtn) {
            console.error("playTrackBtn не инициализирован или не является jQuery объектом.");
            return;
        }

        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.playTrackBtn.setAttribute('src', '/lib/resources/play (2).jpg');
            this.pauseTrack();
        } else {
            this.playTrack();
            this.playTrackBtn.setAttribute('src', '/lib/resources/pause.png');
        }
    }

    playTrack(): void {
        if (this.trackForUrl !== null) {
            this.trackForUrl.play();
        }
    }
    pauseTrack(): void {
        if (this.trackForUrl !== null) {
            this.trackForUrl.pause();
        }
    }

    getIndexCurrentTrack(track: ITrack): number {
        if (this.resultTracks !== null) {
            for (let i = 0; i < this.resultTracks.length; i++) {
                if (this.resultTracks[i].id == track.id) {
                    return i;
                }
            }
        }
        return -1;
    }

    nextTrack(): void {
        if (this.currentTrack !== null) {
            const indexCurrentTrack = this.getIndexCurrentTrack(this.currentTrack);

            if (this.resultTracks !== null) {
                if (indexCurrentTrack === this.resultTracks.length - 1) {
                    this.changeTrackPanel(this.resultTracks[0]);
                } else {
                    this.changeTrackPanel(this.resultTracks[indexCurrentTrack + 1]);
                }
            }

            this.playTrack();
        }
    }

    prevTrack(): void {
        if (this.currentTrack != null) {
            const indexCurrentTrack = this.getIndexCurrentTrack(this.currentTrack);

            if (this.resultTracks !== null) {
                if (indexCurrentTrack === 0) {
                    this.changeTrackPanel(this.resultTracks[this.resultTracks.length - 1]);
                } else {
                    this.changeTrackPanel(this.resultTracks[indexCurrentTrack - 1]);
                }
            }
            this.playTrack();
        }
    }
    loadTrack(chooseTrackId: number): Promise<string> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Home/GetUrlForTrack',
                type: 'GET',
                data: { trackId: chooseTrackId },
                success: function (url: string) {
                    if (url) {
                        resolve(url);
                    } else {
                        reject('URL не найден');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                },
            });
        });
    }

    changeTrackPanel(track: ITrack): void {
        this.trackArtistPanel!.textContent = track.artist;
        this.trackTitlePanel!.textContent = track.title;
        this.imgForGradient!.setAttribute('src', track.coverPath + '?t=' + new Date().getTime());

        const playAfterLoad = () => {
            this.playTrack();
            this.trackForUrl!.removeEventListener('loadeddata', playAfterLoad);
        };

        if (!track.downloadUrl) {
            this.loadTrack(track.id)
                .then((url: string): void => {
                    track.downloadUrl = url;
                    this.trackForUrl!.src = track.downloadUrl;

                    for (let i = 0; i < this.resultTracks!.length; i++) {
                        if (track.id === this.resultTracks![i].id) {
                            this.resultTracks![i].downloadUrl = url;
                        }
                    }

                    this.trackForUrl!.addEventListener('loadeddata', playAfterLoad);
                })
                .catch((error: unknown): void => console.error(error)); // Уточненный тип ошибки
        } else {
            this.trackForUrl!.src = track.downloadUrl;
            this.trackForUrl!.addEventListener('loadeddata', playAfterLoad);
        }

        this.currentTrack = track;
        this.playTrackBtn!.setAttribute('src', '/lib/resources/pause.png');
    }
}