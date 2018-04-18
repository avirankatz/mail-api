const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
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

app.listen(3000, "0.0.0.0", () => console.log('Mail API listening on port 3000!'));
