const express = require('express');
const config = require('../../config.json');
const { catchAsync } = require('../../utils');
const fetch = require('node-fetch');
const btoa = require('btoa');
const router = express.Router();
const CLIENT_ID = config.panelId;
const CLIENT_SECRET = config.panelSecret;
const REDIRECT_URI = config.panelRedirect;
const DiscordOauth2 = require("discord-oauth2");
//'https://snobot.yernemm.xyz/api/discord/callback'

const oauth = new DiscordOauth2();

router.get('/login', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify&redirect_uri=${REDIRECT_URI}`);
});

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    //const response = await fetch(`https://discord.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
  /*  const response = await fetch(`https://discord.com/api/oauth2/token`,
      {
        method: 'POST',
        body: {
          'client_id': CLIENT_ID,
          'client_secret': CLIENT_SECRET,
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': redirect,
          'scope': 'identify'
        },
        headers: {
      //    Authorization: `Basic ${creds}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
    const json = await response.json();
    */

    let json = await oauth.tokenRequest({
    // clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,

      code: code,
      grantType: "authorization_code",
      scope: "identify"
    });

    let options = {
        maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours.
        //httpOnly: true // The cookie only accessible by the web server
        path: "/"
    }

    // Set cookie
    res.cookie('access_token', json.access_token, options) // options is optional


    res.send(json);

    //res.redirect(`/panel`);

  }));

module.exports = router;
