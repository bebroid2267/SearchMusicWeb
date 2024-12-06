using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using search_musics.Domain.Entities;
using search_musics.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace search_musics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracksLikeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TracksLikeController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("{trackId}/like")]
        public async Task<IActionResult> LikeTrack(string idTrack, string titleTrack, string artistTrack, string coverPath, string downloadUrl)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            // Проверяем, есть ли уже такой трек в базе
            var existingTrack = await _context.Tracks
                .FirstOrDefaultAsync(x => x.Id == idTrack);

            Track track;

            // Если трек не существует, создаем новый
            if (existingTrack == null)
            {
                track = new Track()
                {
                    Id = idTrack,
                    Title = titleTrack,
                    Artist = artistTrack,
                    CoverPath = coverPath,
                    DonwloadUrl = downloadUrl
                };

                _context.Tracks.Add(track);  // Добавляем новый трек в контекст
                await _context.SaveChangesAsync();  // Сохраняем изменения в базу
            }
            else
            {
                track = existingTrack;  // Если трек существует, используем его
            }

            // Проверяем, не лайкнул ли уже пользователь этот трек
            var existingLike = await _context.TrackLikes
                .FirstOrDefaultAsync(l => l.TrackId == track.Id && l.UserId == user.Id);

            if (existingLike != null)
            {
                return BadRequest(new { message = "You already liked this track." });
            }

            // Создаем новый лайк
            var like = new TrackLike
            {
                Id = Guid.NewGuid().ToString(),
                Track = track,
                UserId = user.Id,
                TrackId = track.Id
            };

            _context.TrackLikes.Add(like);  // Добавляем лайк в контекст
            await _context.SaveChangesAsync();  // Сохраняем изменения в базу

            return Ok(new { message = "Track liked successfully!" });
        }



        // Убрать лайк
        [HttpDelete("{trackId}/like")]
        public async Task<IActionResult> UnlikeTrack(int trackId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var like = await _context.TrackLikes
                .FirstOrDefaultAsync(l => l.TrackId == trackId.ToString() && l.UserId == user.Id);

            if (like == null)
            {
                return NotFound(new { message = "Like not found." });
            }

            _context.TrackLikes.Remove(like);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Like removed successfully!" });
        }

        [HttpGet("{trackId}/likedthis")]
        public async Task<IActionResult> IsExistLikeTrack(int trackId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            var id = user.Id;

            var userLikes = await _context.TrackLikes
                .Where(x => x.UserId == user.Id)
                .ToListAsync();



            var likedTracks = await _context.TrackLikes
                .Where(x => x.UserId == user.Id && x.TrackId == trackId.ToString())
                .Select(x => new
                {
                    x.Track.Id,
                    x.Track.Title,
                    x.Track.Artist,
                    x.Track.DonwloadUrl,
                })
                .FirstOrDefaultAsync();
            if (likedTracks == null) return NotFound();

            return Ok();
        }
        // Получить лайкнутые треки
        [HttpGet("liked")]
        public async Task<IActionResult> GetLikedTracks()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var likedTracks = await _context.TrackLikes
                .Where(l => l.UserId == user.Id)
                .Select(l => new
                {
                    l.Track.Id,
                    l.Track.Title,
                    l.Track.Artist,
                    l.Track.DonwloadUrl,
                    l.Track.CoverPath,
                })
                .ToListAsync();

            return Ok(Json(new { TrackList = likedTracks.ToArray() }));
        }
        }
    }
