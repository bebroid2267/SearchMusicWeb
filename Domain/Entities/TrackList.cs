namespace search_musics.Domain.Entities
{
    public class TrackList()
    {
        public Dictionary<int,Track> _tracks = new Dictionary<int,Track>();
        public void AddTrack(int trackKey, string trackId, string trackTitle, string artistName, string coverPath)
        {
            _tracks.Add(trackKey, new Track { Title = trackTitle, Artist = artistName, Id = trackId, CoverPath = coverPath });
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
