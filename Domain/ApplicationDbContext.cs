using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using search_musics.Domain.Entities;

namespace search_musics.Domain
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Track> Tracks { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base (options)
        {
            
        }
    }
}
