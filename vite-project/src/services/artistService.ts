const API_URL = 'https://localhost:44303/Home';

export const getInfoArtist = async (neededThing: string, artistId: string) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }
    try {
        const response = await fetch(`${API_URL}/${neededThing}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Queary: artistId}),
        });
        return await response.json();
    } catch (error) {
        return undefined;
    }
}