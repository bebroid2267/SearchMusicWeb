using Microsoft.AspNetCore.Identity;

namespace search_musics.Domain.Entities
{
    public class TrackLike
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string TrackId { get; set; }

        public virtual IdentityUser User { get; set; }
        public virtual Track Track { get; set; }
    }
}
