const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
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

// app.listen(3000, "0.0.0.0", () => console.log('Mail API listening on port 3000!'));
http.createServer(app).listen(3000);
if (credentials != null)
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(8443);