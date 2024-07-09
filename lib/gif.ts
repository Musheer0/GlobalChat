"use server"

export const getGif = async (query: string) => {
    const api_key = process.env.TENOR_API_KEY;
    const client_key = process.env.TENOR_CLIENT_KEY;
    const limit = 50;

    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/search?q=${query || 'cat'}&key=${api_key}&client_key=${client_key}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Return the parsed JSON data
    } catch (error) {
        console.log('Fetch error:', error);
        return []
    }
};
