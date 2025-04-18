namespace search_musics.Domain.Entities
{
    public class TrackList()
    {
        public Dictionary<int, Track> _tracks = new Dictionary<int, Track>();
        public void AddTrack(int trackKey, string trackId, string trackTitle, string[] artistNames, string coverPath, List<Artist> artists, Album album)
        {
            _tracks.Add(trackKey, new Track
            {
                Title = trackTitle,
                Artists = artistNames,
                Id = trackId,
                CoverPath = coverPath,
                ArtistsEntity = artists,
                Album = album
            });
        }
        public Track GetTrackInfo(int trackKey)
        {
            if (_tracks.ContainsKey(trackKey))
                return _tracks[trackKey];
            else
                return null;
        }
    }
}