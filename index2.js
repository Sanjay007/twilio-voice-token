const http = require('http');
const express = require('express');
const ClientCapability = require('twilio').jwt.ClientCapability;

const app = express();

app.get('/token', (req, res) => {
  // put your Twilio API credentials here
  
  const accountSid = 'AC07d7e7571e6969bc8680d5c2022b443c';
  const authToken = '235cf75cbdf32b7abd8933a4abf26934';

  // put your Twilio Application Sid here
  const appSid = 'AC7f1c1d93ab2d7588f81d48fb87d287f6';

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

http.createServer(app).listen(3001, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
console.log('Twilio Client app server running at http://127.0.0.1:1337/token/');
