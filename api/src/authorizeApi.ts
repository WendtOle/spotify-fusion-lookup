require('dotenv').config();
const {spotifyApi} = require('./getSpotifyApi.ts');

export const authorizeApi = async (code: string) => {
    console.log("authorizeApi")
    try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    return {}
    } catch (err: any) {
        console.log({body: err.body})
        return {error: err.body.error_description}
    }
    
}
