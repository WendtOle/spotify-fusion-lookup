// setup simple express server
import { getTokens } from './authorizeApi';

const express = require('express');
import {spotifyApi} from "./getSpotifyApi";
const url = require('url');
const querystring = require('querystring');

const app = express();
const port  = process.env.PORT || 8888;
import { authorizeURL } from './authorizeURL';
import { setCors } from './setCors';
import { createPlaylist } from './createPlaylist';
import { sendLineups } from './sendLineups';
import { sendTracks } from './sendTracks';
import { sendPlaylists } from './sendPlaylists';
import { refresh } from './refresh';
import { isAccessTokenValid } from './isAccessTokenValid';

app.use((req: any, res: any, next: any) => {
    setCors(req, res);
    next();
});

app.get('/authorizeURL', authorizeURL);

app.get('/authenticate', async (req: any, res: any) => {
    const { query } = url.parse(req.url);
    const { code } = querystring.parse(query);
    console.log(`code found: ${code}`);
    const {error, data} = await getTokens(code);
    if (data) {
        res.send(data);
        return
    }
    res.send(error);
})

app.get('/accessTokenValid', isAccessTokenValid)
app.get('/refresh', refresh )
app.get('/playlists', sendPlaylists)
app.get('/tracks', sendTracks)
app.post('/createPlaylist', createPlaylist)
app.get('/lineups', sendLineups)


app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
}
);

module.exports = app;
