import { ITrack } from "../Interfaces";

export default class TrackManager {
    public isPlaying: boolean = false;
    public playlist: ITrack[] | null = null;
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
    public mainPanel: HTMLDivElement | null = null;
    public currentTimeTrack: HTMLParagraphElement | null = null;
    public allTimeTrack: HTMLParagraphElement | null = null;

    private onTrackChange: any | null = null;
    private onProgressBarChange: any | null = null;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;

    constructor() {

         this.canvas = document.createElement('canvas');
         this.ctx = this.canvas.getContext('2d');
        this.onProgressBarChange;

        this.trackForUrl = document.querySelector('#track_for_url') as HTMLAudioElement | null;
        
        this.isPlaying = false;

        this.playTrackBtn = document.querySelector('#play-music-btn') as HTMLImageElement | null;
        this.imgForGradient = document.querySelector('#img-for-gradient') as HTMLImageElement | null;
        this.trackArtistPanel = document.querySelector('.track-artist-panel') as HTMLHeadingElement | null;
        this.trackTitlePanel = document.querySelector('.track-title-panel') as HTMLParagraphElement | null;

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
    }

     updateProgressTrack(e: any): void {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;

        this.allTimeTrack!.textContent = this.secondsToMinutes(duration);
        this.currentTimeTrack!.textContent = this.secondsToMinutes(currentTime);
        this.progressBar!.style.width = `${progressPercent}%`;
    }

    private secondsToMinutes(seconds: any) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const finallySeconds = Math.round(remainingSeconds);
        if (finallySeconds) {
            return `${minutes}:${finallySeconds > 9 ? finallySeconds : '0' + finallySeconds}`;
        }
        else {
            return '0:00';
        }
    }
    setCurrentTrack(newTrack: ITrack) {
        if (this.onTrackChange) {
            this.isPlaying = true;
            this.onTrackChange(newTrack);
        }
    }

    setOnTrackChangeListener(callback: any) {
        this.onTrackChange = callback;
    }
    setOnProgressBarChangeListener(callback: any) {
        this.onProgressBarChange = callback;
    }
    
    playTrack(): void {
        if (this.trackForUrl !== null) {
            this.isPlaying = true;
            this.trackForUrl.play();
        }
    }
    pauseTrack(): void {
        if (this.trackForUrl !== null) {
            this.isPlaying = false;
            this.trackForUrl.pause();
        }
    }
    clearTrack(): void {
        this.trackForUrl!.src = '';
    }

    changeBackgroundMainPanel() {
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

            const gradient = `rgb(${0},${0},${0}, 0.3)`;
            this.mainPanel!.style.background = gradient;
            this.mainPanel!.style.backdropFilter = `blur(10px)`;
            // this.mainPanel!.style.background = gradient;
        }

    }
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
    
                const gradient = `rgb(${r},${g},${b}, 0.8)`;
                this.gradientDiv!.style.background = gradient;
                this.gradientDiv!.style.backdropFilter = `blur(20px)`;
                this.gradientDiv!.style.background = gradient;
            }
    }
    changeTrackPanel(track: ITrack): void {
        this.imgForGradient!.crossOrigin = 'anonymous';
        this.imgForGradient!.setAttribute('src', track.coverPath + '?t=' + new Date().getTime());

        this.imgForGradient!.onload = () => {
            this.changeBackgroundMusicPanel();
            this.changeBackgroundMainPanel();
        };

        const playAfterLoad = () => {
            this.playTrack();
            this.trackForUrl!.removeEventListener('loadeddata', playAfterLoad);
        };
        console.log(track);
        this.trackForUrl!.src = track.downloadUrl;

        this.trackForUrl!.addEventListener('loadeddata', playAfterLoad);
        this.setCurrentTrack(track);
    }
}