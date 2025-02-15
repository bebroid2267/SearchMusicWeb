using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using search_musics.Domain.Entities;
using search_musics.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System.Text.Json;

namespace search_musics.Controllers
{
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
        public async Task<IActionResult> LikeTrack(string track)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            string decodedTrack = Uri.UnescapeDataString(track);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            Track deSerializedTrack = System.Text.Json.JsonSerializer.Deserialize<Track>(decodedTrack, options);

            // Проверяем, есть ли уже такой трек в базе
            var existingTrack = await _context.Tracks
                .FirstOrDefaultAsync(x => x.Id == deSerializedTrack.Id);

            // Если трек не существует, создаем новый
            if (existingTrack == null)
            {
                // Проверяем, существует ли Artist
                var existingArtist = await _context.Artists
                    .FirstOrDefaultAsync(a => a.Id == deSerializedTrack.ArtistEntity.Id);

                if (existingArtist != null)
                {
                    deSerializedTrack.ArtistEntity = existingArtist; // Привязываем существующего артиста
                }

                // Проверяем, существует ли Album
                var existingAlbum = await _context.Albums
                    .FirstOrDefaultAsync(a => a.id == deSerializedTrack.Album.id);

                if (existingAlbum != null)
                {
                    deSerializedTrack.Album = existingAlbum; // Привязываем существующий альбом
                }

                // Добавляем трек в контекст
                _context.Tracks.Add(deSerializedTrack);
                await _context.SaveChangesAsync();
            }

            else
            {
                deSerializedTrack = existingTrack;  // Если трек существует, используем его
            }

            // Проверяем, не лайкнул ли уже пользователь этот трек
            var existingLike = await _context.TrackLikes
                .FirstOrDefaultAsync(l => l.TrackId == deSerializedTrack.Id && l.UserId == user.Id);

            if (existingLike != null)
            {
                return BadRequest(new { message = "You already liked this track." });
            }

            // Создаем новый лайк
            var like = new TrackLike
            {
                Id = Guid.NewGuid().ToString(),
                Track = deSerializedTrack,
                UserId = user.Id,
                TrackId = deSerializedTrack.Id
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
                    x.Track.DownloadUrl,
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
                    l.Track.DownloadUrl,
                    l.Track.CoverPath,
                    l.Track.Album,
                    l.Track.ArtistEntity
                })
                .ToListAsync();

            return Ok(Json(likedTracks.ToArray()));
        }
    }
}
