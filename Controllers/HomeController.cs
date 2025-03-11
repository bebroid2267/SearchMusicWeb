using Microsoft.AspNetCore.Mvc;
using search_musics.Domain.Entities;
using search_musics.Models;
using System.Diagnostics;

namespace search_musics.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public IActionResult SearchTracks([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid) // �������� �� "!" ��� ���������� ��������
                return BadRequest(ModelState);

            var trackList = YandexMusic.GetInfoTracks(model.Queary);

            if (trackList == null) return NotFound(ModelState);

            var tracksArray = trackList._tracks.Select(x => x.Value).ToArray();
            return Json(new { TrackList = tracksArray }); // ���������� TrackList
        }
        [HttpPost]
        public IActionResult SearchArtists([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid) // �������� �� "!" ��� ���������� ��������
                return BadRequest(ModelState);

            var artistList = YandexMusic.GetInfoArtists(model.Queary);
            if (artistList == null) return NotFound();

            return Json(new { ArtistList = artistList.ToArray()});
        }

        [HttpPost]
        public IActionResult SearchAlbums([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var albumsList = YandexMusic.GetInfoAlbums(model.Queary);
            if (albumsList == null) return NotFound();
            
            return Json(new {  AlbumList = albumsList.ToArray()});
        }

        [HttpPost]
        public IActionResult GetTracksAlbum([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tracksList = YandexMusic.GetTracksAlbum(model.Queary);
            if (tracksList == null) return NotFound();

            return Json(new { TrackList = tracksList.ToArray() });
        }
        [HttpPost]
        public IActionResult GetAlbumsArtist([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var albumsList = YandexMusic.GetAlbumsArtist(model.Queary);
            if (albumsList == null) return NotFound();

            return Json(new { AlbumList = albumsList.ToArray()});
        }
        [HttpPost]
        public IActionResult GetTracksArtist([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var trackList = YandexMusic.GetTracksArtist(model.Queary, page: model.Page, pageSize: model.PageSize);
            if (trackList == null) return NotFound();

            return Json(new { TrackList = trackList.ToArray() });
        }
        [HttpGet]
        public IActionResult GetUrlForTrack(string trackId)
        {
            string url =  YandexMusic.GetUrlForDownloadTrack(trackId);

            if (url == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(url);
            }
        }
        [HttpPost]
        public IActionResult ResultSearch([FromForm] QuearyModel model)
        {
            ViewData["Model"] = model.Queary;
            return View("ResultSearch");
        }
    }
}