import { IAlbum, IArtist } from "../Interfaces";

export default class ArtistManager {
    public coverArtist: HTMLImageElement | null = null;
    public gradientDiv: HTMLDivElement | null = null;
    public gradientDivBetweenPanel: HTMLDivElement | null = null;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

    }

    public changeBackgroundArtistPanel() {
        const currentImage = this.coverArtist;

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
            const gradient = `rgb(${r},${g},${b}, 1)`;
            this.gradientDiv!.style.background = gradient;
            if (this.gradientDivBetweenPanel) {
                this.gradientDivBetweenPanel!.style.background = gradient;
            }
        }

    }
    public changeArtist(artist: IArtist) {
        this.coverArtist!.crossOrigin = 'anonymous';
        this.coverArtist!.setAttribute('src', artist.coverPath + '?t=' + new Date().getTime());
        
        this.coverArtist!.onload = () => {
            this.changeBackgroundArtistPanel();
        }
    };
    public changeAlbum(album: IAlbum) {
        this.coverArtist!.crossOrigin = 'anonymous';
        this.coverArtist!.setAttribute('src', album.coverPath + '?t=' + new Date().getTime());
        
        this.coverArtist!.onload = () => {
            this.changeBackgroundArtistPanel();
        }
    }
}
