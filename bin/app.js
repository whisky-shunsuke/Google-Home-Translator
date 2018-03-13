const googlehome = require('google-home-notifier')
const language = 'ja';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Translate = require('@google-cloud/translate');

const projectId = 'process.env.GCP_PJ_ID';
const translate = new Translate({
  projectId: projectId,
});

const target = 'en';

googlehome.device('Google-Home', language);

var fs = require("fs");

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server is online.');

app.post('/', function(req, res,next) {

    const text = req.body.name;

    translate
        .translate(text, target)
        .then(results => {
            const translation = results[0];
    
            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);
            googlehome.notify(translation, function(translation) {
                console.log(translation);
            });
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    res.send('POST request to the homepage');
})
