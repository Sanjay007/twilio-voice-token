const http = require('http');
const express = require('express');
const ClientCapability = require('twilio').jwt.ClientCapability;

const app = express();

app.get('/token', (req, res) => {
  // put your Twilio API credentials here
  const accountSid = 'AC07d7e7571e6969bc8680d5c2022b443c';
  const authToken = 'lUSW5oXsLRRaWpnqm0ALdPqkSUa9Qlr0';

  // put your Twilio Application Sid here
  const appSid = 'SK8131066812d0822b0ac088184fa571af';

  const capability = new ClientCapability({
    accountSid: accountSid,
    authToken: authToken,
  });
  capability.addScope(
    new ClientCapability.OutgoingClientScope({ applicationSid: appSid })
  );
  capability.addScope(new ClientCapability.IncomingClientScope('joey'));
  const token = capability.toJwt();

  res.set('Content-Type', 'application/jwt');
  res.send(token);
});

app.post('/voice', (req, res) => {
  // TODO: Create TwiML response
});

http.createServer(app).listen(1337, '127.0.0.1');
console.log('Twilio Client app server running at http://127.0.0.1:1337/token/');