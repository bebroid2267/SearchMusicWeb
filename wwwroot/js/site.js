function triggerEvent(msg) {
    const clickQuaeryButton = new CustomEvent('clickEvent', {
        detail: { message: msg }
    });
    document.dispatchEvent(clickQuaeryButton);
}


//const trackForUrl = document.querySelector('#track_for_url');
//const progressBar = document.querySelector('.progress');
//const progressContainer = document.querySelector('.progress__container');

//const nextTrackBtn = document.querySelector('.next-track-button');
//const prevTrackBtn = document.querySelector('.prev-track-button');

//nextTrackBtn.addEventListener('click', nextTrack);
//prevTrackBtn.addEventListener('click', prevTrack);

//let resultTracks = [];
//var indexTrack;

//progressContainer.addEventListener('click', setProgress);
//trackForUrl.addEventListener('timeupdate', updateProgress);


//$(function () {
//    $('#btn_queary').click(function () {
//        $(".intro__content").css('display', 'none');
//        $(".result-tracks").css('display', 'block');
//        var queary = $('#input_queary').val();
//        if (queary) {
//            $.ajax({
//                url: '/Home/RedirectToResultSearch',
//                type: 'POST',
//                contentType: 'application/json',
//                data: JSON.stringify({ Queary: queary }),
//                success: function (response) {
//                    $('.tracks').empty();

//                    // Проверяем, существует ли TrackList и является ли он объектом с _tracks
//                    if (response && response.trackList && Array.isArray(response.trackList)) {
//                        resultTracks.length = 0;
//                        response.trackList.forEach(function (track) {

//                            resultTracks.push(track);
//                            console.log('вставили трек');

//                            $('.tracks').append(
//                                `<li class="track-item" data-id="${track.id}" 
//                                                        data-download-url="${track.donwloadUrl}"
//                                                        data-cover-path="${track.coverPath}" 
//                                                        data-title="${track.title}" 
//                                                        data-artist="${track.artist}">
//                                    <img src="${track.coverPath}" alt="Обложка песни" class="cover">
//                                        <div class="track-info">
//                                            <h3 class="track-title">${track.title}</h3>
//                                            <p class="track-artist">${track.artist}</p>
//                                        </div>
//                                </li>`
//                            );
//                        });
//                        $('.result-tracks').show();

//                    } else {
//                        $('.tracks').append('<li>Треки не найдены.</li>');
//                        $('.result-tracks').show();
//                    }
//                },
//                error: function (xhr, status, error) {
//                    if (xhr.responseJSON) {
//                        alert(xhr.responseJSON.errors.Queary[0]); // Показываем сообщение об ошибке валидации
//                    }
//                }
//            });
//        } else {
//            alert("Введите запрос для поиска.");
//        }
//    });
//});
//document.addEventListener("DOMContentLoaded", function () {
//    let isPlaying = false;

//    $('.tracks').on('click', '.track-item', function () {

//        const panelArtist = $('.track-artist-panel').text();
//        const panelTitle = $('.track-title-panel').text();

//        const chooseTrackTitle = $(this).data('title');
//        const chooseTrackArtist = $(this).data('artist');
//        const chooseTrackCover = $(this).data('cover-path');
//        const chooseTrackUrl = $(this).data('download-url');

//        if (panelArtist !== chooseTrackArtist || panelTitle !== chooseTrackTitle) {

//            const track = {
//                artist: chooseTrackArtist,
//                title: chooseTrackTitle,
//                coverPath: chooseTrackCover,
//                donwloadUrl: chooseTrackUrl
//            };
//            changeTrackPanel(track);

//            playSong();
//            $('#play-music-btn').attr('src', '/lib/resources/pause.png');
//        }
//    });

    

//    $('#play-music-btn').click(function () {
//        isPlaying = !isPlaying;

//        if (isPlaying) {
//            // Если воспроизводим, меняем на иконку паузы
//            $('#play-music-btn').attr('src', '/lib/resources/play (2).jpg');
//            // Здесь можно добавить код для начала воспроизведения музыки
//            pauseSong();
//        } else {
//            playSong();
//            // Если на паузе, меняем на иконку воспроизведения
//            $('#play-music-btn').attr('src', '/lib/resources/pause.png');
//            // Здесь можно добавить код для остановки воспроизведения музыки
//        }
//    });
//});

//document.addEventListener("DOMContentLoaded", function () {
//    const img = document.getElementById('img-for-gradient');
//    const gradientDiv = document.getElementById('gradient-box');

//    img.crossOrigin = "anonymous";
//    // Создаем временный canvas
//    const canvas = document.createElement('canvas');
//    const ctx = canvas.getContext('2d');

//    img.onload = function () {
//        // Устанавливаем размеры canvas такие же, как у изображения
//        canvas.width = img.width;
//        canvas.height = img.height;

//        // Рисуем изображение на canvas
//        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//        // Извлекаем данные о пикселях
//        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//        const data = imageData.data;

//        let r = 0, g = 0, b = 0, count = 0;

//        // Проходим по пикселям и суммируем значения цветов
//        for (let i = 0; i < data.length; i += 4) {
//            r += data[i];
//            g += data[i + 1];
//            b += data[i + 2];
//            count++;
//        }

//        // Находим средние значения
//        r = Math.floor(r / count);
//        g = Math.floor(g / count);
//        b = Math.floor(b / count);

//        // Создаем градиент от белого к среднему цвету изображения
//        const gradient = `linear-gradient(to left, rgb(67,67,69), rgb(${r},${g},${b}))`;
//        gradientDiv.style.background = gradient;
//    };

//    // Заставляем обновить градиент при изменении изображения
//    $('#img-for-gradient').on('load', function () {
//        img.src = img.src; // Перезагружаем изображение, чтобы вызвать событие onload
//    });
//});
//function updateProgress(e) {
//    const { duration, currentTime } = e.srcElement;
//    const progressPercent = (currentTime / duration) * 100;
//    progressBar.style.width = `${progressPercent}%`;
//}
//function setProgress(e) {
//    const width = this.clientWidth;
//    const clickX = e.offsetX;
//    const duration = trackForUrl.duration;

//    trackForUrl.currentTime = (clickX / width) * duration;
//}
////progressContainer.addEventListener('click', setProgress);
////trackForUrl.addEventListener('timeupdate', updateProgress);
//function playSong() {
//    trackForUrl.play();
//}

//function pauseSong() {
//    trackForUrl.pause();
//}
//function findIndexCurrentTrack() {
//    for (var i = 0; i < resultTracks.length; i++) {
//        if (resultTracks[i].donwloadUrl === trackForUrl.src) {
//            return i;
//        }
//    }
//}

//function nextTrack() {
//    var indexCurrentTrack = findIndexCurrentTrack();
//    console.log(indexCurrentTrack);

//    // Проверяем, не является ли текущий трек последним в списке
//    if (indexCurrentTrack === resultTracks.length - 1) {
//        changeTrackPanel(resultTracks[0]); // Переход к первому треку
//    } else {
//        changeTrackPanel(resultTracks[indexCurrentTrack + 1]); // Переход к следующему треку
//    }

//    playSong(); // Начинаем воспроизведение следующего трека
//}

//function prevTrack() {
//    var indexCurrentTrack = findIndexCurrentTrack();

//    // Проверяем, не является ли текущий трек первым в списке
//    if (indexCurrentTrack === 0) {
//        changeTrackPanel(resultTracks[resultTracks.length - 1]); // Переход к последнему треку
//    } else {
//        changeTrackPanel(resultTracks[indexCurrentTrack - 1]); // Переход к предыдущему треку
//    }

//    playSong(); // Начинаем воспроизведение предыдущего трека
//}

//function changeTrackPanel(track) {
//    $('.track-artist-panel').text(track.artist);
//    $('.track-title-panel').text(track.title);
//    $('#img-for-gradient').attr('src', track.coverPath + '?t=' + new Date().getTime());
//    trackForUrl.src = track.donwloadUrl;;
//}