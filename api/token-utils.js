const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const LIFE = 7200;
let expiration = null;
let accessToken = null;
const getAccessToken = (accountId, privateKey) => {

  if(!accountId || !privateKey){
    throw new Error('please provice accountId AND privateKey');
  }
  const halfLife = (Date.now() / 1000) + LIFE / 2;
  if (
    expiration !== null &&
    expiration > halfLife &&
    accessToken !== null
  ) {
    return accessToken;
  }
  const payloadExpiration = (Date.now() / 1000) + LIFE;
  const payload = {
    aud: 'https://api.einstein.ai/v2/oauth2/token',
    exp: payloadExpiration,
    sub: accountId,
  };
  const token = jwt.sign(
    payload,
    privateKey.replace(/\\n/g, '\n'),
    { algorithm: 'RS256'},
  );
  return fetch('https://api.einstein.ai/v2/oauth2/token', {
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((response) =>{
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // const { access_token } = response.json();
    return response.json();

  }).then((accessToken) => {

    return accessToken.access_token;

  }).catch((err) => {
    console.error(err);
  });
};

exports.getAccessToken = getAccessToken;