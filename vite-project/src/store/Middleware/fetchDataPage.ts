import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'https://a34295-0341.w.d-f.pw/Home';

export type artistProps = {
    artistId: string;
    pageSize: number;
    page: number;
}
export type quearyProps = {
    queary: string;
    pageSize: number;
    page: number;
}

export type searchProps = {
    queary: string;
    pageSize: number;
    page: number;
}

export const fetchTracksArtist = createAsyncThunk(
    'artist/fetchTracks',
    async (artistProps: artistProps, { rejectWithValue}) => {
        try {
            console.log(artistProps);
            const response = await fetch(`${API_URL}/GetTracksArtist`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: artistProps.artistId, PageSize: artistProps.pageSize, Page: artistProps.page}),
            });
            const artists = await response.json();
            return artists.trackList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTracksArtistPage = createAsyncThunk(
    'artist/fetchTracksPage',
    async (artistProps: artistProps, { rejectWithValue}) => {
        try {
            console.log(artistProps);
            const response = await fetch(`${API_URL}/GetTracksArtist`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: artistProps.artistId, PageSize: artistProps.pageSize, Page: artistProps.page}),
            });
            const artists = await response.json();
            return artists.trackList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAlbumsArtist = createAsyncThunk(
    'artist/fetchAlbums',
    async (artistProps: artistProps, { rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/GetAlbumsArtist`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: artistProps.artistId, PageSize: artistProps.pageSize, Page: artistProps.page}),
            });
            const albums = await response.json();
            return albums.albumList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAlbumsArtistPage = createAsyncThunk(
    'artist/fetchAlbumsPage',
    async (artistProps: artistProps, { rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/GetAlbumsArtist`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: artistProps.artistId, PageSize: artistProps.pageSize, Page: artistProps.page}),
            });
            const result = await response.json();
            return result.albumList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTracksAlbum = createAsyncThunk(
    'album/fetchTracks',
    async (albumId: string, { rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/GetTracksAlbum`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: albumId}),
            });
            const tracks = await response.json();
            return tracks.trackList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchTracks = createAsyncThunk(
    'data/searchTracks',
    async(queary: quearyProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchTracks/${queary}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({Queary: queary.queary, PageSize: queary.pageSize, Page: queary.page}),
            });    
            const tracks = await response.json();
            console.log(tracks);
            return tracks.trackList;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);
export const searchTrackPage = createAsyncThunk(
    'data/searchTracksPage',
    async(quearyProps: quearyProps, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/SearchTracks/${quearyProps.queary}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({Queary: quearyProps.queary, PageSize: quearyProps.pageSize, Page: quearyProps.page}),
                });    
            const tracks = await response.json();
            return tracks.trackList;
        } catch (error) {
            return rejectWithValue(null);
        }

    }
);

export const searchAlbums = createAsyncThunk(
    'data/searchAlbums',
    async(quearyProps: quearyProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchAlbums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Queary: quearyProps.queary, PageSize: quearyProps.pageSize, Page: quearyProps.page }),
            });    
            const albums = await response.json();
            return albums.albumList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchAlbumPage = createAsyncThunk(
    'data/searchAlbumsPage',
    async (searchProps: searchProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchAlbums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Queary: searchProps.queary, PageSize: searchProps.pageSize, Page: searchProps.page }),
            });    
            const result = await response.json();
            return result.albumList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchArtists = createAsyncThunk(
    'data/searchArtists',
    async(quearyProps: quearyProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchArtists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Queary: quearyProps.queary, PageSize: quearyProps.pageSize, Page: quearyProps.page }),
            });    
            const artists = await response.json();
            return artists.artistList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchArtistPage = createAsyncThunk(
    'data/searchArtistsPage',
    async (searchProps: searchProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchArtists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Queary: searchProps.queary, PageSize: searchProps.pageSize, Page: searchProps.page }),
            });    
            const result = await response.json();
            return result.artistList;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchLikedTracks = createAsyncThunk(
    'data/fetchLikedTracks',
    async (data: string | null, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            data;
            return null;
          }
    
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    
        try {
            const response: any = await fetch(`https://a34295-0341.w.d-f.pw/api/tracksLike/liked`, { 
                method: 'GET',
                headers });
            const answer = await response.json();
            return answer.value;
            
          } catch (error) {
            return rejectWithValue(null);
          }
    }
)
