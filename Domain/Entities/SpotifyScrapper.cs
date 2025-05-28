using Leaf.xNet;
using Newtonsoft.Json.Linq;
using System.Net;

    namespace search_musics.Domain.Entities
    {
        public static class SpotifyScrapper
        {
            private static readonly string searchBaseUrl = "https://spotify-scraper.p.rapidapi.com/v1/search";
            private static readonly string downloadBaseUrl = "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud";
            private static readonly string apiKey = "8ae7076bc4msh53dfbdaf964f91fp1f28b4jsnc6f06992ef3f";
            private static readonly string host = "spotify-scraper.p.rapidapi.com";




        public static async Task<List<Track>> GetTracksAsync(string query, int page = 1, int pageSize = 10)
        {
                List<Track> tracks = new List<Track>();
            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);


                var url = $"{searchBaseUrl}?term={query}&type=track&page={page}&limit={pageSize}";
                var response = req.Get(url).ToString();
                var json = JObject.Parse(response);
                var results = json["tracks"]?["items"];

                if (results == null) return tracks;

                foreach (var item in results)
                {
                    var artists = item["artists"]?.Select(artist => artist["name"]?.ToString()).ToArray();

                    var track = new Track
                    {
                        Id = item["id"]?.ToString(),
                        Title = item["name"]?.ToString(),
                        CoverPath = item["album"]?["cover"]?[2]?["url"]?.ToString() ?? "",
                        Artists = artists ?? Array.Empty<string>(),
                        DownloadUrl = item["preview_url"]?.ToString(),
                        Album = new Album
                        {
                            id = item["album"]?["id"]?.ToString(),
                            Title = item["album"]?["name"]?.ToString(),
                            Year = item["album"]?["release_date"]?.ToString()?.Substring(0, 4),
                            CoverPath = item["album"]?["images"]?[0]?["url"]?.ToString() ?? ""
                        },
                    };
                    tracks.Add(track);
                }

                return tracks;
            }
        }

        public static async Task<List<Artist>> GetArtistsAsync(string query, int page = 1, int pageSize = 10)
        {
                List<Artist> artists = new List<Artist>();

            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);


                var url = $"{searchBaseUrl}?term={query}&type=artist&page={page}&limit={pageSize}";
                var response = req.Get(url).ToString();
                var json = JObject.Parse(response);
                var results = json["artists"]?["items"];
                if (results == null) return artists;

                foreach (var item in results)
                {
                    var artist = new Artist
                    {
                        Id = item["id"]?.ToString(),
                        Name = item["name"]?.ToString(),
                        CoverPath = item["images"]?[0]?["url"]?.ToString() ?? ""
                    };
                    artists.Add(artist);
                }
                return artists;
            }
        }

        public static async Task<List<Album>> GetAlbumsAsync(string query, int page = 1, int pageSize = 10)
        {
            List<Album> albums = new List<Album>();
            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);

                var url = $"{searchBaseUrl}?term={query}&type=album&page={page}&limit={pageSize}";
                var response = req.Get(url).ToString();
                var json = JObject.Parse(response);
                var results = json["albums"]?["items"];
                if (results == null) return albums;

                foreach (var item in results)
                {
                    var artists = item["artists"]?.Select(artist => artist["name"]?.ToString()).ToArray();

                    var album = new Album
                    {
                        id = item["id"]?.ToString(),
                        Title = item["name"]?.ToString(),
                        Year = item["release_date"]?.ToString()?.Substring(0, 4),
                        CoverPath = item["images"]?[0]?["url"]?.ToString() ?? "",
                        ArtistsName = artists ?? Array.Empty<string>()
                    };
                    albums.Add(album);
                }
                return albums;
            }
        }

        public static async Task<string?> GetTrackDownloadUrlAsync(string trackId)
        {
            var url = $"{downloadBaseUrl}?track={trackId}&quality=sq";

            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);

                var response = req.Get(url).ToString();

                if (string.IsNullOrEmpty(response))
                    return null;

                var json = JObject.Parse(response);
                return json["soundcloudTrack"]?["audio"]?[0]?["url"]?.ToString();
            }
        }

        public static async Task<List<Album>> GetAlbumsArtist(string artistId)
        {
                List<Album> albums = new List<Album>();

            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);

                var url = $"https://spotify-scraper.p.rapidapi.com/v1/artist/albums?artistId={artistId}";
                var response = req.Get(url).ToString();

                if (string.IsNullOrEmpty(response))
                    return albums;

                var json = JObject.Parse(response);
                var results = json["albums"]?["items"];
                if (results == null) return albums;

                foreach (var item in results)
                {
                    var album = new Album
                    {
                        id = item["id"]?.ToString(),
                        Title = item["name"]?.ToString(),
                        Year = item["release_date"]?.ToString()?.Substring(0, 4),
                        CoverPath = item["images"]?[0]?["url"]?.ToString() ?? "",
                        ArtistsName = item["artists"]?.ToObject<List<string>>()?.ToArray()
                    };
                    albums.Add(album);
                }

                return albums;
            }
        }
        

        public static async Task<List<Track>> GetTracksArtist(string artistId, int page = 1, int pageSize = 10)
        {
                List<Track> tracks = new List<Track>();

            using (var req = new Leaf.xNet.HttpRequest())
            {
                req.Proxy = HttpProxyClient.Parse("82.211.3.2:59100:maksim2464:3XYXG5t2M7");
                req.UserAgent = Http.ChromeUserAgent();

                req.AddHeader("X-RapidAPI-Key", apiKey);
                req.AddHeader("X-RapidAPI-Host", host);


                var url = $"https://spotify-scraper.p.rapidapi.com/v1/artist/top-tracks?artistId={artistId}&page={page}&limit={pageSize}";
                var response = req.Get(url).ToString();

                if (string.IsNullOrEmpty(response))
                    return tracks;

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
                        Artists = item["artists"]?.ToObject<List<string>>()?.ToArray(),
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
    }
