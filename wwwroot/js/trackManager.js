export default class TrackManager {
    constructor() {
        this.isPlaying = null;
        this.resultTracks = null;
        this.trackForUrl = null;
        this.playTrackBtn = null;
        this.currentTrack = null;
        this.trackArtistPanel = null;
        this.trackTitlePanel = null;
        this.imgForGradient = null;
        this.progressBar = null;
        this.progressContainer = null;
        this.nextTrackBtn = null;
        this.prevTrackBtn = null;
        this.gradientDiv = null;
        this.imgPlay = null;
        this.imgStop = null;
        this.onTrackChange = null;
        this.onProgressBarChange = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Ищем элементы в DOM, если они уже существуют
        this.trackForUrl = document.querySelector('#track_for_url');
        this.resultTracks = [];
        this.isPlaying = false;
        // Используем document.createElement для создания новых элементов, если они не существуют в DOM
        this.playTrackBtn = document.querySelector('#play-music-btn');
        this.imgForGradient = document.querySelector('#img-for-gradient');
        this.trackArtistPanel = document.querySelector('.track-artist-panel');
        this.trackTitlePanel = document.querySelector('.track-title-panel');
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
        const track = {
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
    updateProgressTrack(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
    }
    setCurrentTrack(newTrack) {
        this.currentTrack = newTrack;
        if (this.onTrackChange) {
            this.onTrackChange(newTrack);
        }
    }
    setOnTrackChangeListener(callback) {
        this.onTrackChange = callback;
    }
    setOnProgressBarChangeListener(callback) {
        this.onProgressBarChange = callback;
    }
    playTrackClick() {
        if (!this.playTrackBtn) {
            return;
        }
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.pauseTrack();
        }
        else {
            this.playTrack();
        }
    }
    playTrack() {
        if (this.trackForUrl !== null) {
            this.trackForUrl.play();
        }
    }
    pauseTrack() {
        if (this.trackForUrl !== null) {
            this.trackForUrl.pause();
        }
    }
    getIndexCurrentTrack(track) {
        if (this.resultTracks !== null) {
            for (let i = 0; i < this.resultTracks.length; i++) {
                if (this.resultTracks[i].id == track.id) {
                    return i;
                }
            }
        }
        return -1;
    }
    nextTrack() {
        if (this.currentTrack !== null) {
            const indexCurrentTrack = this.getIndexCurrentTrack(this.currentTrack);
            if (this.resultTracks !== null) {
                if (indexCurrentTrack === this.resultTracks.length - 1) {
                    this.changeTrackPanel(this.resultTracks[0]);
                }
                else {
                    this.changeTrackPanel(this.resultTracks[indexCurrentTrack + 1]);
                }
            }
            this.playTrack();
        }
    }
    prevTrack() {
        if (this.currentTrack != null) {
            const indexCurrentTrack = this.getIndexCurrentTrack(this.currentTrack);
            if (this.resultTracks !== null) {
                if (indexCurrentTrack === 0) {
                    this.changeTrackPanel(this.resultTracks[this.resultTracks.length - 1]);
                }
                else {
                    this.changeTrackPanel(this.resultTracks[indexCurrentTrack - 1]);
                }
            }
            this.playTrack();
        }
    }
    loadTrack(chooseTrackId) {
        return new Promise((resolve, reject) => {
            fetch(`https://localhost:44303/Home/GetUrlForTrack?trackId=${chooseTrackId}`, {
                method: 'GET',
            })
                .then(response => {
                if (!response.ok) {
                }
                return response.text();
            })
                .then(url => {
                if (url) {
                    resolve(url);
                }
                else {
                    reject('url not found');
                }
            })
                .catch(error => {
                reject(error.method);
            });
        });
    }
    ;
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
            this.gradientDiv.style.background = gradient;
            this.gradientDiv.style.background = gradient;
        }
    }
    changeTrackPanel(track) {
        this.trackArtistPanel.textContent = track.artist;
        this.trackTitlePanel.textContent = track.title;
        this.imgForGradient.crossOrigin = 'anonymous';
        this.imgForGradient.setAttribute('src', track.coverPath + '?t=' + new Date().getTime());
        this.imgForGradient.onload = () => {
            this.changeBackgroundMusicPanel();
        };
        const playAfterLoad = () => {
            this.playTrack();
            this.trackForUrl.removeEventListener('loadeddata', playAfterLoad);
        };
        if (!track.downloadUrl) {
            this.loadTrack(track.id)
                .then((url) => {
                track.downloadUrl = url;
                this.trackForUrl.src = track.downloadUrl;
                for (let i = 0; i < this.resultTracks.length; i++) {
                    if (track.id === this.resultTracks[i].id) {
                        this.resultTracks[i].downloadUrl = url;
                    }
                }
                this.trackForUrl.addEventListener('loadeddata', playAfterLoad);
            })
                .catch((error) => { }); // Уточненный тип ошибки
        }
        else {
            this.trackForUrl.src = track.downloadUrl;
            this.trackForUrl.addEventListener('loadeddata', playAfterLoad);
        }
        this.setCurrentTrack(track);
    }
}
