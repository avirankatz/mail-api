const express = require('express');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

app.post('/mail', (req, res) => {
    nodemailer.mail({
        from: "קואופרטיב בשותף <no-reply@beshutaf.org>", // sender address
        to: "aviran.katz@gmail.com", // list of receivers
        subject: "מישהו מילא את אחד הסקרים", // Subject line
        html: `המשתמש <b>${req.body.user}</b> מילא את הסקר <b>sdgsad</b>.`
      });
    res.json('Hello World!')
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));