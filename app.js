const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

app.post('/mail', (req, res) => {
    nodemailer.mail({
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        html: req.body.html
      });
    res.json('Mail sent!');
});

app.listen(3000, () => console.log('Mail API listening on port 3000!'));