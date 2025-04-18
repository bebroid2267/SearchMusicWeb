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

        private static readonly YandexMusicApi.Api.Track _track = new(networkParams, token);
        private static readonly YandexMusicApi.Api.Artist _artist = new (networkParams, token);
        private static readonly YandexMusicApi.Api.Album _album = new (networkParams, token);

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
                var artists = new List<string>();

                if ( item["coverUri"] != null)
                {
                    coverUri = GetCoverUri(item["coverUri"].ToString(), "1000x1000");
                }
                if (item["artists"] is JArray artistsArray && artistsArray.Count > 0)
                {
                    for (int i = 0; i < item["artists"]?.Count(); i++)
                    {
                        artists.Add(item["artists"][i]["name"].ToString() ?? "Unknown Artist");
                    }
                }
                else
                {
                    artists.Add("Unkown Artist");
                }


                albums.Add(new Album()
                {
                    id = item["id"].ToString(),
                    CoverPath = coverUri,
                    Title = item["title"].ToString(),
                    Year = item["year"] == null ? " " : item["year"].ToString(),
                    ArtistsName = artists.ToArray(),
                });
            }

            return albums;
        }
        public static TrackList GetInfoTracks(string queary, int page = 0, int pageSize = 10)
        {
            TrackList tracks = new();
            int countTracks = 0;

            var searchResult = defApi.Search(queary, page, typeSearch: "track", pageSize:pageSize).Result;

            var tracksResults = searchResult?["result"]?["tracks"]?["results"];

            if (tracksResults == null)
            {
                return null;
            }

            foreach (var item in tracksResults)
            {
                List<Artist> artists = new List<Artist>();

                for (int i = 0; i < item["artists"].Count(); i++)
                {
                    artists.Add(new Artist()
                    {
                        Id = item["artists"][i]["id"].ToString(),
                        CoverPath = GetCoverUri(item["artists"][i]["cover"]?["uri"].ToString(), "1000x1000"),
                        Name = item["artists"][i]["name"].ToString(),
                    });
                }

                Album album = new Album();
                album.id = item["albums"][0]["id"].ToString();
                album.ArtistsName = artists.Select(x =>  x.Name).ToArray();
                album.CoverPath = GetCoverUri(item["albums"][0]["coverUri"]?.ToString(), "1000x1000");
                album.Year = item["albums"][0]["year"] == null ? " " : item["albums"][0]["year"].ToString();
                album.Title = item["albums"][0]["title"].ToString();

                tracks.AddTrack(countTracks,
                    item["id"].ToString(),
                    item["title"].ToString(),
                    artists.Select(x => x.Name).ToArray(),
                    GetCoverUri(item["coverUri"]?.ToString(), "100x100"), 
                    artists,
                    album           
                );

                countTracks++;
            }
            return tracks;
        }

        public static string GetUrlForDownloadTrack(string trackId)
        {
            var downloadInfo = _track.GetDownloadInfoWithToken(trackId).Result;

            try
            {
                if (downloadInfo["result"] != null && downloadInfo["result"][0] != null && downloadInfo["result"][0]["downloadInfoUrl"] != null)
                {
                    var downloadInfoUrl = downloadInfo["result"][0]["downloadInfoUrl"].ToString();
                    var directLink = _track.GetDirectLink(downloadInfoUrl).Result;

                    return directLink;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
        public static List<Track> GetTracksAlbum(string albumId)
        {
            List<Track> tracks = new List<Track>();
            var resultTracks = _album.GetTracks(int.Parse(albumId), pageSize: 10).Result;

            var filteredAnswer = resultTracks["result"]?["volumes"];

            if (filteredAnswer == null)
            {
                return null;
            }

            foreach (var items in filteredAnswer)
            {
                foreach (var track in items)
                {
                    var coverUri = string.Empty;
                    List<Artist> artists = new List<Artist>();

                    for (int i = 0; i < track["artists"].Count(); i++)
                    {
                        artists.Add(new Artist()
                        {
                            Id = track["artists"][i]["id"].ToString(),
                            CoverPath = track["artists"][i]["cover"] != null ? GetCoverUri(track["artists"][i]["cover"]["uri"].ToString(), "1000x1000") : coverUri,
                            Name = track["artists"][i]["name"].ToString(),
                        });
                    }


                    Album album = new Album();

                    album.id = track["albums"][0]["id"].ToString();
                    album.ArtistsName = artists.Select(x => x.Name).ToArray();
                    album.CoverPath = GetCoverUri(track["albums"][0]["coverUri"]?.ToString(), "1000x1000");
                    album.Year = track["albums"][0]["year"] == null ? " " : track["albums"][0]["year"].ToString();
                    album.Title = track["albums"][0]["title"].ToString();


                    tracks.Add(new Track()
                    {
                        Id = track["id"].ToString(),
                        Title = track["title"].ToString(),
                        Artists = artists.Select(x => x.Name).ToArray(),
                        CoverPath = GetCoverUri(track["coverUri"]?.ToString(),"100x100"),
                        ArtistsEntity = artists,
                        Album = album
                    });
                }
            }
            return tracks;
        }
        public static List<Track> GetTracksArtist(string artistId, int page = 0, int pageSize = 10)
        {
            List<Track> tracks = new List<Track>();

            var resultTracks = _artist.GetTracks(int.Parse(artistId), page: page, pageSize: pageSize).Result;

            var filteredAsnwer = resultTracks["result"]?["tracks"];

            if (filteredAsnwer == null)
            {
                return null;
            }

            foreach (var item in filteredAsnwer)
            {
                var coverUri = string.Empty;

                List<Artist> artists = new List<Artist>();

                for (int i = 0; i < item["artists"].Count(); i++)
                {
                    artists.Add(new Artist()
                    {
                        Id = item["artists"][i]["id"].ToString(),
                        CoverPath = item["artists"][i]["cover"] != null ? GetCoverUri(item["artists"][i]["cover"]["uri"].ToString(), "1000x1000") : coverUri,
                        Name = item["artists"][i]["name"].ToString(),
                    });
                }

                Album album = new Album();

                album.id = item["albums"][0]["id"].ToString();
                album.ArtistsName = artists.Select(x => x.Name).ToArray();
                album.CoverPath = GetCoverUri(item["albums"][0]["coverUri"]?.ToString(), "1000x1000");
                album.Year = item["albums"][0]["year"] == null ? " " : item["albums"][0]["year"].ToString();
                album.Title = item["albums"][0]["title"].ToString();


                tracks.Add(new Track()
                {
                    Id = item["id"].ToString(),
                    Title = item["title"].ToString(),
                    Artists = artists.Select(x => x.Name).ToArray(),
                    CoverPath = GetCoverUri(item["coverUri"]?.ToString(), "100x100"),
                    ArtistsEntity = artists,
                    Album = album
                });
            }
            return tracks;
        }

        public static List<Album> GetAlbumsArtist(string artistId)
        {
            List<Album> albums = new List<Album>();

            var resultAlbums = _artist.GetDirectAlbums(int.Parse(artistId), pageSize: 10).Result;

            var filteredAnswer = resultAlbums["result"]?["albums"];
            if (filteredAnswer == null)
            {
                return null;
            }

            foreach (var item in filteredAnswer)
            {
                var coverUri = string.Empty;
                var artists = new List<string>();

                if (item["coverUri"] != null)
                {
                    coverUri = GetCoverUri(item["coverUri"].ToString(), "1000x1000");
                }

                for (int i = 0; i < item["artists"].Count(); i++)
                {
                    artists.Add(item["artists"][i]["name"].ToString());
                }

                albums.Add(new Album()
                {
                    id = item["id"].ToString(),
                    CoverPath = coverUri,
                    Title = item["title"].ToString(),
                    Year = item["year"] == null ? " " : item["year"].ToString(),
                    ArtistsName = artists.ToArray(),
                });
            }
            return albums;
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
            return coverUri != null ? "https://" + coverUri.Replace("%%", px) : "";
        }
    }
}
