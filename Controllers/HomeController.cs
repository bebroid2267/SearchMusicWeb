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
            if (!ModelState.IsValid) // Изменено на "!" для корректной проверки
                return BadRequest(ModelState);

            var trackList = YandexMusic.GetInfoTracks(model.Queary);

            var tracksArray = trackList._tracks.Select(x => x.Value).ToArray();
            return Json(new { TrackList = tracksArray }); // Возвращаем TrackList
        }
        [HttpPost]
        public IActionResult SearchArtists([FromBody] QuearyModel model)
        {
            if (!ModelState.IsValid) // Изменено на "!" для корректной проверки
                return BadRequest(ModelState);

            var artistList = YandexMusic.GetInfoArtists(model.Queary);

            return Json(new { ArtistList = artistList.ToArray()});
        }
        [HttpPost]
        public IActionResult ResultSearch([FromForm] QuearyModel model)
        {
            ViewData["Model"] = model.Queary;
            return View("ResultSearch"); // Если данных нет, передаем пустой массив
        }

    }
}
