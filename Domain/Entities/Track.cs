namespace search_musics.Domain.Entities
{
    public class Track
    {
        public string Title { get; set; }
        public string[] Artists { get; set; }
        public string CoverPath { get; set; }
        public string Id { get; set; }
        public string DownloadUrl { get; set; }
        public List<Artist> ArtistsEntity { get; set; }
        public Album Album {  get; set; }
    }
}
