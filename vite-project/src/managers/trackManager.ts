import { ITrack } from "../Interfaces";

export default class TrackManager {
    public isPlaying: boolean | null = null;
    public resultTracks: ITrack[] | null = null;
    public trackForUrl: HTMLAudioElement | null = null;
    public playTrackBtn: HTMLImageElement | null = null;
    public currentTrack: ITrack | null = null;
    public trackArtistPanel: HTMLHeadingElement | null = null;
    public trackTitlePanel: HTMLParagraphElement | null = null;
    public imgForGradient: HTMLImageElement | null = null;
    public progressBar: HTMLDivElement | null = null;
    public progressContainer: HTMLDivElement | null = null;
    public nextTrackBtn: HTMLImageElement | null = null;
    public prevTrackBtn: HTMLImageElement | null = null;
    public gradientDiv: HTMLDivElement | null = null;

    public imgPlay: any | null = null;
    public imgStop: any | null = null;

    private onTrackChange: any | null = null;
    private onProgressBarChange: any | null = null;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;



    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.onProgressBarChange;

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

     updateProgressTrack(e: any): void {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar!.style.width = `${progressPercent}%`;
    }

    setCurrentTrack(newTrack: ITrack) {
        this.currentTrack = newTrack;

        if (this.onTrackChange) {
            this.onTrackChange(newTrack);
        }
    }

    setOnTrackChangeListener(callback: any) {
        this.onTrackChange = callback;
    }
    setOnProgressBarChangeListener(callback: any) {
        this.onProgressBarChange = callback;
    }
    
    playTrackClick(): void {
        if (!this.playTrackBtn) {
            return;
        }

        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.pauseTrack();
        } else {
            this.playTrack();
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

                fetch(`https://a30895-8359.x.d-f.pw/Home/GetUrlForTrack?trackId=${chooseTrackId}`, {
                method: 'GET',
                })
                .then( response => {
                    if (!response.ok) {
                    }
                    return response.text();
                })
                .then(url => {
                    if (url) {
                        resolve(url);
                    } else {
                        reject('url not found');
                    }
                })
                .catch(error => {
                    reject(error.method);
                })
            } 
    )};

    changeBackgroundMusicPanel() {
        const currentImage = this.imgForGradient;
    
            if (this.ctx && currentImage) {
                this.canvas.width = currentImage.width;
                this.canvas.height = currentImage.height;
                this.ctx.drawImage(currentImage, 0, 0, this.canvas.width, this.canvas.height);
    
                const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                const data = imageData.data;
    
                let r = 0, g = 0, b = 0, count = 0;
    
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }
    
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
    
                // Обновление градиента
                const gradient = `linear-gradient(to left, rgb(67,67,69), rgb(${r},${g},${b}))`;
                this.gradientDiv!.style.background = gradient;
                this.gradientDiv!.style.background = gradient;
            }
    }
    changeTrackPanel(track: ITrack): void {
        this.trackArtistPanel!.textContent = track.artist;
        this.trackTitlePanel!.textContent = track.title;
        this.imgForGradient!.crossOrigin = 'anonymous';
        this.imgForGradient!.setAttribute('src', track.coverPath + '?t=' + new Date().getTime());

        this.imgForGradient!.onload = () => {
            this.changeBackgroundMusicPanel();
        };

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
                .catch((error: unknown): void => {error}); // Уточненный тип ошибки
        } else {
            this.trackForUrl!.src = track.downloadUrl;
            this.trackForUrl!.addEventListener('loadeddata', playAfterLoad);
        }

        this.setCurrentTrack(track);
    }
}