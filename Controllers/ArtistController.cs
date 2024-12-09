using Microsoft.AspNetCore.Mvc;

namespace search_musics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
