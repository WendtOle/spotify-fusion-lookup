import { spotifyApi } from "./getSpotifyApi";

export const getUserPlaylists = async ({accessToken, limit, page}: {accessToken: string, limit: number, page: number}): Promise<SpotifyApi.PlaylistObjectSimplified[]> => {
    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getUserPlaylists({limit, offset: page * 50});
    return data.body.items;
}