import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'https://localhost:44303/Home';

export type artistProps = {
    artistId: string;
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
    async (artistId: string, { rejectWithValue}) => {
        try {
            const response = await fetch(`${API_URL}/GetAlbumsArtist`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Queary: artistId}),
            });
            const albums = await response.json();
            return albums.albumList;
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
    async(queary: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchTracks/${queary}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ Queary: queary }),
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
    async(queary: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchAlbums/${queary}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ Queary: queary }),
            });    
            const albums = await response.json();
            return albums.albumList;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

export const searchArtists = createAsyncThunk(
    'data/searchArtists',
    async(queary: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/SearchArtists/${queary}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ Queary: queary }),
            });    
            const artists = await response.json();
            return artists.artistList;
        } catch (error) {
            return rejectWithValue(null);
        }
    }
);

export const fetchLikedTracks = createAsyncThunk(
    'data/fetchLikedTracks',
    async (data: string | null, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return null;
          }
    
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    
        try {
            const response: any = await fetch(`https://localhost:44303/api/tracksLike/liked`, { 
                method: 'GET',
                headers });
            const answer = await response.json();
            return answer.value;
            
          } catch (error) {
            return rejectWithValue(null);
          }
    }
)
