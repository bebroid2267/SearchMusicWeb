export default class DataService {

    //getTracks(tracks, resultTracks) {
    //    $.ajax({
    //        url: '/Home/SearchTracks',
    //        type: 'POST',
    //        contentType: 'application/json',
    //        data: JSON.stringify({ Queary: tracksValue }),
    //        success: function (response) {
    //            $('.tracks').empty();

    //            if (response && response.trackList && Array.isArray(response.trackList)) {
    //                trackManager.resultTracks.length = 0;
    //                response.trackList.forEach(function (track) {

    //                    trackManager.resultTracks.push(track);

    //                    tracks.append(
    //                        `<li class="track-item" data-id="${track.id}" 
    //                                                    data-cover-path="${track.coverPath}" 
    //                                                    data-title="${track.title}" 
    //                                                    data-artist="${track.artist}">
    //                                    <img src="${track.coverPath}" alt="Обложка песни" class="cover">
    //                                        <div class="track-info">
    //                                            <h3 class="track-title">${track.title}</h3>
    //                                            <p class="track-artist">${track.artist}</p>
    //                                        </div>
    //                                </li>`
    //                    );
    //                });
    //                resultTracks.show();

    //            } else {
    //                tracks.append('<li>Треки не найдены.</li>');
    //                resultTracks.show();
    //            }
    //        },
    //        error: function (xhr, status, error) {
    //            if (xhr.responseJSON) {
    //                alert(xhr.responseJSON.errors.Queary[0]);
    //            }
    //        }
    //    });
    //}
}