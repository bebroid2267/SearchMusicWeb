using Leaf.xNet;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;

    namespace search_musics.Domain.Entities
{
    public static class SpotifyScrapper
    {
        private static readonly string searchBaseUrl = "https://spotify-scraper.p.rapidapi.com/v1/search";
        private static readonly string downloadBaseUrl = "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud";
        private static readonly string apiKey = "596814e52cmsh7995181d9581fe2p13d6dejsn66a884e161f0";
        private static readonly string host = "spotify-scraper.p.rapidapi.com";


        private static readonly HttpClient httpClient;

        static SpotifyScrapper()
        {
            var proxy = new WebProxy("http://localhost:5206");
            var handler = new HttpClientHandler()
            {
                Proxy = proxy,
                UseProxy = true,
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            httpClient = new HttpClient(handler);
            httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36");
            httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Key", apiKey);
            httpClient.DefaultRequestHeaders.Add("X-RapidAPI-Host", host);
        }


        public static async Task<List<Track>> GetTracksAsync(string query, int page = 1, int pageSize = 10)
        {
            var url = $"{searchBaseUrl}?term={Uri.EscapeDataString(query)}&type=track&page={page}&limit={pageSize}";
            var response = await httpClient.GetStringAsync(url);
            var json = JObject.Parse(response);
            var results = json["tracks"]?["items"];
            var tracks = new List<Track>();
            if (results == null) return tracks;

            foreach (var item in results)
            {
                var artistEntities = item["artists"]?
                    .Select(artist => new Artist
                    {
                        Id = artist["id"]?.ToString(),
                        Name = artist["name"]?.ToString(),
                        CoverPath = ""
                    }).ToList() ?? new List<Artist>();

                var artists = artistEntities.Select(a => a.Name).ToArray();

                var track = new Track
                {
                    Id = item["id"]?.ToString(),
                    Title = item["name"]?.ToString(),
                    CoverPath = item["album"]?["cover"]?[2]?["url"]?.ToString() ?? "",
                    Artists = artists,
                    DownloadUrl = item["preview_url"]?.ToString(),
                    Album = new Album
                    {
                        id = item["album"]?["id"]?.ToString(),
                        Title = item["album"]?["name"]?.ToString(),
                        Year = item["album"]?["release_date"]?.ToString()?.Substring(0, 4),
                        CoverPath = item["album"]?["images"]?[0]?["url"]?.ToString() ?? ""
                    },
                    ArtistsEntity = artistEntities
                };

                tracks.Add(track);
            }
            return tracks;
        }

        public static async Task<List<Artist>> GetArtistsAsync(string query, int page = 1, int pageSize = 10)
        {
            var url = $"{searchBaseUrl}?term={Uri.EscapeDataString(query)}&type=artist&page={page}&limit={pageSize}";
            var response = await httpClient.GetStringAsync(url);
            var json = JObject.Parse(response);
            var results = json["artists"]?["items"];
            var artists = new List<Artist>();
            if (results == null) return artists;

            foreach (var item in results)
            {
                var artist = new Artist
                {
                    Id = item["id"]?.ToString(),
                    Name = item["name"]?.ToString(),
                    CoverPath = item["visuals"]?["avatar"]?[2]?["url"]?.ToString() ?? ""
                };
                artists.Add(artist);
            }
            return artists;
        }

        public static async Task<List<Album>> GetAlbumsAsync(string query, int page = 1, int pageSize = 10)
        {
            var url = $"{searchBaseUrl}?term={Uri.EscapeDataString(query)}&type=album&offset={page}&limit={pageSize}";
            var response = await httpClient.GetStringAsync(url);
            var json = JObject.Parse(response);
            var results = json["albums"]?["items"];
            var albums = new List<Album>();
            if (results == null) return albums;

            foreach (var item in results)
            {
                var artists = item["artists"]?.Select(artist => artist["name"]?.ToString()).ToArray();
                var coverPath = item["cover"]?[0]?["url"]?.ToString() ?? "";

                var album = new Album
                {
                    id = item["id"]?.ToString(),
                    Title = item["name"]?.ToString(),
                    Year = item["date"]?.ToString()?.Substring(0, 4),
                    CoverPath = coverPath,
                    ArtistsName = artists ?? Array.Empty<string>()
                };
                albums.Add(album);
            }
            return albums;
        }

        public static async Task<string?> GetTrackDownloadUrlAsync(string trackId)
        {
            var url = $"{downloadBaseUrl}?track={trackId}&quality=sq";
            var response = await httpClient.GetStringAsync(url);
            if (string.IsNullOrEmpty(response)) return null;

            var json = JObject.Parse(response);
            var audioArray = json["soundcloudTrack"]?["audio"] as JArray;

            var mp3Object = audioArray?
                .FirstOrDefault(a => a?["mimeType"]?.ToString() == "audio/mpeg" && a?["format"]?.ToString() == "mp3");

            var rawUrl = mp3Object?["url"]?.ToString();
            if (rawUrl == null) return null;

            var fixedUrl = rawUrl
                .Replace("\\u0026", "&")
                .Replace("%5Cu0026", "&")
                .Replace("\\", "");

            return fixedUrl;
        }

        public static async Task<List<Album>> GetAlbumsArtist(string artistId)
        {
            var url = $"https://spotify-scraper.p.rapidapi.com/v1/artist/albums?artistId={artistId}";
            var response = await httpClient.GetStringAsync(url);
            var albums = new List<Album>();
            if (string.IsNullOrEmpty(response)) return albums;

            var json = JObject.Parse(response);
            var results = json["albums"]?["items"];
            if (results == null) return albums;

            foreach (var item in results)
            {
                var artists = item["artists"]?.Select(artist => artist["name"]?.ToString()).ToArray() ?? Array.Empty<string>();
                var coverPath = item["cover"]?[0]?["url"]?.ToString() ?? "";
                var releaseDate = item["date"]?.ToString()?.Substring(0, 4);

                var album = new Album
                {
                    id = item["id"]?.ToString(),
                    Title = item["name"]?.ToString(),
                    CoverPath = coverPath,
                    Year = releaseDate,
                    ArtistsName = artists
                };
                albums.Add(album);
            }
            return albums;
        }

        public static async Task<List<Track>> GetTracksAlbum(string albumId)
        {
            var url = $"https://spotify-scraper.p.rapidapi.com/v1/album/tracks?albumId={albumId}";
            var response = await httpClient.GetStringAsync(url);
            var tracks = new List<Track>();
            if (string.IsNullOrEmpty(response)) return tracks;

            var json = JObject.Parse(response);
            var results = json["tracks"]?["items"];
            if (results == null) return tracks;

            foreach (var item in results)
            {
                var artists = item["artists"]?.Select(artist => new Artist
                {
                    Name = artist["name"]?.ToString() ?? "",
                    Id = artist["id"]?.ToString() ?? "",
                    CoverPath = item["cover"]?[0]?["url"]?.ToString() ?? ""
                }).ToList() ?? new List<Artist>();

                var track = new Track
                {
                    Id = item["id"]?.ToString() ?? "",
                    Title = item["name"]?.ToString() ?? "",
                    CoverPath = item["album"]?["images"]?[2]?["url"]?.ToString() ?? "",
                    ArtistsEntity = artists,
                    DownloadUrl = null,
                    Album = new Album
                    {
                        id = item["album"]?["id"]?.ToString(),
                        Title = item["album"]?["name"]?.ToString(),
                        Year = item["album"]?["release_date"]?.ToString()?.Substring(0, 4),
                        CoverPath = item["album"]?["images"]?[0]?["url"]?.ToString() ?? ""
                    }
                };
                tracks.Add(track);
            }
            return tracks;
        }

        public static async Task<List<Track>> GetTracksArtist(string artistId, int page = 1, int pageSize = 10)
        {
            var url = $"https://spotify-scraper.p.rapidapi.com/v1/artist/albums?artistId={artistId}&type=single&offset={page}&limit={pageSize}";
            var response = await httpClient.GetStringAsync(url);
            var tracks = new List<Track>();
            if (string.IsNullOrEmpty(response)) return tracks;

            var json = JObject.Parse(response);
            var results = json["tracks"]?["items"];
            if (results == null) return tracks;

            foreach (var item in results)
            {
                var track = new Track
                {
                    Id = item["id"]?.ToString(),
                    Title = item["name"]?.ToString(),
                    CoverPath = item["album"]?["images"]?[2]?["url"]?.ToString() ?? "",
                    Artists = item["artists"]?.Select(a => a["name"]?.ToString()).ToArray(),
                    DownloadUrl = item["preview_url"]?.ToString(),
                    Album = new Album
                    {
                        id = item["album"]?["id"]?.ToString(),
                        Title = item["album"]?["name"]?.ToString(),
                        Year = item["album"]?["release_date"]?.ToString()?.Substring(0, 4),
                        CoverPath = item["album"]?["images"]?[0]?["url"]?.ToString() ?? ""
                    }
                };
                tracks.Add(track);
            }
            return tracks;
        }
    }
}