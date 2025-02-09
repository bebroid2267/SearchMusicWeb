import axios from 'axios';
import TrackManager from '../managers/trackManager';

const API_URL = 'https://localhost:44303/api/tracksLike';

export const fetchLikedTracks = async (): Promise<any | undefined> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
      }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(`${API_URL}/liked`, { headers });
        if (response.data && response.data.value.trackList) {
            return response.data.value;
        }
      } catch (error) {
        return undefined;
      }
}

export const getDifferentMusicResult = async (neededThing: string, queary: string) => {
  var globalResponse;
  try {
    globalResponse = await fetch(`https://localhost:44303/Home/${neededThing}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Queary: queary }),
    });
    const data = await globalResponse.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const isCurrentTrackLiked = async (trackManager: TrackManager, unLikeTrack: any, likeTrack: any) => {
    const token = localStorage.getItem('token');

    if (!token || trackManager.currentTrack?.coverPath === 'test') {
      console.log('PIDORAS');
      return { isLiked: false, image: unLikeTrack};
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      await axios.get(`${API_URL}/${trackManager.currentTrack!.id}/likedthis`, { headers });
      console.log('вернули true');
      return { isLiked: true, image: likeTrack };
    } catch (error) {
      console.log('вернули false');
      return { isLiked: false, image: unLikeTrack };
    }
  
};

export const likedTrack = async (shouldLikeTrack: boolean, track: any) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  if (shouldLikeTrack)
  {
    await axios.delete(`${API_URL}/${track.id}/like`, { headers });
  }
  else {
    await axios.post(
      `${API_URL}/${track.id}/like?track=${encodeURIComponent(JSON.stringify(track))}`,
      null,
      { headers }
    );
  }
};