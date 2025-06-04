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
        public async Task<IActionResult> SearchTracks([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var trackList = await SpotifyScrapper.GetTracksAsync(model.Queary, model.Page, model.PageSize);

            if (trackList == null)
                return NotFound(ModelState);

            return Json(new { TrackList = trackList });
        }

        [HttpPost]
        public async Task<IActionResult> SearchArtists([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var artistList = await SpotifyScrapper.GetArtistsAsync(model.Queary);
            if (artistList == null)
                return NotFound();

            return Json(new { ArtistList = artistList.ToArray() });
        }

        [HttpPost]
        public async Task<IActionResult> SearchAlbums([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var albumsList = await SpotifyScrapper.GetAlbumsAsync(model.Queary);
            if (albumsList == null)
                return NotFound();

            return Json(new { AlbumList = albumsList.ToArray() });
        }
        [HttpPost]
        public async Task<IActionResult> GetUrlForTrack(string trackId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var downloadUrl = await SpotifyScrapper.GetTrackDownloadUrlAsync(trackId);

            if (string.IsNullOrEmpty(downloadUrl))
                return NotFound(new { message = "Download URL not found for the track." });
            var babyDanilklaGo = Json(downloadUrl);
            return Json(downloadUrl);
        }

        [HttpPost]
        public async Task<IActionResult> GetAlbumsArtist([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var albumsList = await SpotifyScrapper.GetAlbumsArtist(model.Queary);

            if (albumsList == null || albumsList.Count == 0)
                return NotFound(new { message = "No albums found for the artist." });

            return Json(new { AlbumList = albumsList.ToArray() });
        }

        [HttpPost]
        public async Task<IActionResult> GetTracksArtist([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var trackList = await SpotifyScrapper.GetTracksArtist(model.Queary, model.Page, model.PageSize);

            if (trackList == null || trackList.Count == 0)
                return NotFound(new { message = "No tracks found for the artist." });

            return Json(new { TrackList = trackList.ToArray() });
        }


        [HttpPost]
        public IActionResult ResultSearch([FromForm] QuearyModel model)
        {
            ViewData["Model"] = model.Queary;
            return View("ResultSearch");
        }
    }
}