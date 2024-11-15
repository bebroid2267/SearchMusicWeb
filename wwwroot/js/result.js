import TrackManager from "./trackManager.js";
document.addEventListener('DOMContentLoaded', function () {
    $(function () {
        const img = document.getElementById('img-for-gradient');
        const gradientDiv = document.getElementById('gradient-box');
        img.crossOrigin = "anonymous";
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
                const gradient = `linear-gradient(to left, rgb(67,67,69), rgb(${r},${g},${b}))`;
                gradientDiv.style.background = gradient;
            };
        }
        $('#img-for-gradient').on('load', function () {
            const originalSrc = img.src;
            img.src = '';
            img.src = originalSrc;
        });
    });
    const trackManager = new TrackManager();
    const progressBar = document.querySelector('.progress');
    const tracksElement = document.querySelector('.tracksQuery');
    const tracksValue = tracksElement.dataset.value;
    const progressContainer = document.querySelector('.progress__container');
    const nextTrackBtn = document.querySelector('.next-track-button');
    const prevTrackBtn = document.querySelector('.prev-track-button');
    nextTrackBtn.addEventListener('click', trackManager.nextTrack);
    prevTrackBtn.addEventListener('click', trackManager.prevTrack);
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth; // используем progressContainer напрямую
        const clickX = e.offsetX;
        const duration = trackManager.trackForUrl.duration;
        trackManager.trackForUrl.currentTime = (clickX / width) * duration;
    });
    if (trackManager.trackForUrl) {
        trackManager.trackForUrl.addEventListener('timeupdate', updateProgressTrack);
    }
    else {
        console.error("Элемент #track_for_url не найден.");
    }
    trackManager.playTrackBtn.addEventListener('click', () => trackManager.playTrackClick());
    $(function () {
        $.ajax({
            url: '/Home/SearchTracks',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Queary: tracksValue }),
            success: function (response) {
                $('.tracks').empty();
                if (response && response.trackList && Array.isArray(response.trackList)) {
                    trackManager.resultTracks.length = 0;
                    response.trackList.forEach(function (track) {
                        trackManager.resultTracks.push(track);
                        $('.tracks').append(`<li class="track-item" data-id="${track.id}" 
                                                        data-cover-path="${track.coverPath}" 
                                                        data-title="${track.title}" 
                                                        data-artist="${track.artist}">
                                        <img src="${track.coverPath}" alt="Обложка песни" class="cover">
                                            <div class="track-info">
                                                <h3 class="track-title">${track.title}</h3>
                                                <p class="track-artist">${track.artist}</p>
                                            </div>
                                    </li>`);
                    });
                    $('.result-tracks').show();
                }
                else {
                    $('.tracks').append('<li>Треки не найдены.</li>');
                    $('.result-tracks').show();
                }
            },
            error: function (xhr) {
                if (xhr.responseJSON) {
                    alert(xhr.responseJSON.errors.Queary[0]);
                }
            }
        });
    });
    $('.tracks').on('click', '.track-item', function () {
        const chooseTrackTitle = $(this).data('title');
        const chooseTrackArtist = $(this).data('artist');
        const chooseTrackCover = $(this).data('cover-path');
        const chooseTrackUrl = $(this).data('download-url');
        const chooseTrackId = $(this).data('id');
        const track = {
            artist: chooseTrackArtist,
            title: chooseTrackTitle,
            coverPath: chooseTrackCover,
            downloadUrl: chooseTrackUrl,
            id: chooseTrackId
        };
        trackManager.changeTrackPanel(track);
    });
    function updateProgressTrack(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});
