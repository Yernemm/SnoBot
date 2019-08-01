//res.sendFile(path.join(__dirname + '/web/index.html'));

const express = require('express');
const config = require('../../config.json');
const { catchAsync } = require('../../utils');
const fetch = require('node-fetch');
const btoa = require('btoa');

const router = express.Router();

const CLIENT_ID = config.panelId;
const CLIENT_SECRET = config.panelSecret;
const redirect = encodeURIComponent('http://localhost:8080/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${creds}`,
        },
      });
    const json = await response.json();
    req.url = '/uwu'
    res.redirect(`/panel?token=${json.access_token}`);
    //req.url = '/uwu'
    
    console.log(json)
  }));

module.exports = router;