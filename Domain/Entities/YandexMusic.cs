using Newtonsoft.Json.Linq;
using YandexMusicApi.Api;
using YandexMusicApi.Network;


namespace search_musics.Domain.Entities
{
    public static class YandexMusic
    {
        private static readonly string token = "y0_AgAAAAAhA-lPAAG8XgAAAADRAzhwMJfIR5gWTGaeeX27VkE5XiImapI";

        private static readonly NetworkParams networkParams = new NetworkParams() { };

        private static readonly Default defApi = new(networkParams, token);

        private static readonly YandexMusicApi.Api.Track track = new(networkParams, token);

        private static readonly YandexMusicApi.Api.Artist artist = new YandexMusicApi.Api.Artist(networkParams, token);

        public static List<Album> GetInfoAlbums(string queary)
        {
            List<Album> albums = new();

            int countTracks = 0;

            var searchResult = defApi.Search(queary, typeSearch: "album", pageSize: 8).Result;

            var albumResults = searchResult?["result"]?["albums"]?["results"];

            if (albumResults == null)
            {
                return null;
            }

            foreach (var item in albumResults)
            {
                var coverUri = string.Empty;
                var artistName = string.Empty;

                if ( item["coverUri"] != null)
                {
                    coverUri = GetCoverUri(item["coverUri"].ToString(), "1000x1000");
                }
                if (item["artists"] is JArray artistsArray && artistsArray.Count > 0)
                {
                    artistName = artistsArray[0]["name"]?.ToString() ?? "Unknown Artist";
                }

                albums.Add(new Album()
                {
                    id = item["id"].ToString(),
                    CoverPath = coverUri,
                    Title = item["title"].ToString(),
                    Year = item["year"].ToString(),
                    ArtistName = artistName,
                });
            }

            return albums;
        }
        public static TrackList GetInfoTracks(string queary)
        {
            TrackList tracks = new();
            int countTracks = 0;

            var searchResult = defApi.Search(queary, typeSearch: "track", pageSize:16).Result;

            var tracksResults = searchResult?["result"]?["tracks"]?["results"];

            if (tracksResults == null)
            {
                return null;
            }

            foreach (var item in tracksResults)
            {
                tracks.AddTrack(countTracks,
                    item["id"].ToString(),
                    item["title"].ToString(),
                    item["artists"][0]["name"].ToString(),
                    GetCoverUri(item["coverUri"].ToString(),
                    "100x100"));

                countTracks++;
            }

            return tracks;
        }

        public static string GetUrlForDownloadTrack(string trackId)
        {
            var downloadInfo = track.GetDownloadInfoWithToken(trackId).Result;

            if (downloadInfo["result"] != null && downloadInfo["result"][0] != null && downloadInfo["result"][0]["downloadInfoUrl"] != null)
            {
                var downloadInfoUrl = downloadInfo["result"][0]["downloadInfoUrl"].ToString();
                var directLink = track.GetDirectLink(downloadInfoUrl).Result;

                return directLink;
            }
            else
                return null;
        }

        public static List<Artist> GetInfoArtists(string titleTrack)
        {
            List<Artist> artists = new List<Artist>();

            var searhResultArtist = defApi.Search(titleTrack, typeSearch: "artist", pageSize: 8).Result;
            if (searhResultArtist != null)
            {

                var apiResultArtistsResult = searhResultArtist["result"]?["artists"]?["results"];

                if (apiResultArtistsResult == null)
                {
                    return null;
                }

                foreach (var item in apiResultArtistsResult)
                {
                    var coverUri = string.Empty;
                    if (item["cover"] != null && item["cover"]["uri"] != null)
                    {
                        coverUri = GetCoverUri(item["cover"]["uri"].ToString(), "1000x1000");
                    }

                    artists.Add(new Artist()
                    {
                        Id = item["id"].ToString(),
                        CoverPath = coverUri,
                        Name = item["name"].ToString()
                    });
                }
            }
            return artists;
        }
        private static string GetCoverUri(string coverUri, string px)
        {
            return coverUri != null ? "https://" + coverUri.Replace("%%", px) : null;
        }
    }
}
