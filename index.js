const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { TypingDNAReactiveClient } = require('typingdnaclient-rxjs');

const app = express();
const port = 3000;

app.use(cors());

const apiKey = process.env.TYPING_DNA_API_KEY;
const apiSecret = process.env.TYPING_DNA_API_SECRET;
const typingDnaClient = new TypingDNAReactiveClient(apiKey, apiSecret);

app.post('/', bodyParser.json(), (req, res) => {
  console.log(req.url, req.body);
  typingDnaClient
    .auto(req.body.user, req.body.pattern)
    .subscribe(autoResponse => res.send(autoResponse));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
