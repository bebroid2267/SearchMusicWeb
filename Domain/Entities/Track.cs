namespace search_musics.Domain.Entities
{
    public class Track
    {
        public string Title { get; set; }
        public string Artist { get; set; }
        public string CoverPath { get; set; }
        public string Id { get; set; }
        public string DownloadUrl { get; set; }
        public Artist ArtistEntity { get; set; }
        public Album Album {  get; set; }
    }
}
