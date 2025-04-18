using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using search_musics.Domain.Entities;
using System.Text.Json;

namespace search_musics.Domain
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }

        public DbSet<TrackLike> TrackLikes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var stringArrayConverter = new ValueConverter<string[], string>(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<string[]>(v, (JsonSerializerOptions)null)
            );

            var stringArrayComparer = new ValueComparer<string[]>(
                (c1, c2) => c1.SequenceEqual(c2),    // Сравнение элементов массива
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())), // Хеширование
                c => c.ToArray() // Копирование массива
            );


            // Применяем к полю Artists
            modelBuilder.Entity<Track>()
                .Property(t => t.Artists)
                .HasConversion(stringArrayConverter)
                .Metadata.SetValueComparer(stringArrayComparer);

            modelBuilder.Entity<IdentityUserLogin<string>>()
                        .HasKey(login => login.UserId);
        }
    
    }   
}
