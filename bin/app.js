const googlehome = require('google-home-notifier')
const language = 'ja';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    // リクエストボディを出力
    fs.writeFileSync('out.txt', req.body.name);
    // パラメータ名、nameを出力
    console.log(req.body.name);
    // 発声
    googlehome.notify(req.body.name, function(res) {
        console.log(res);
    });
    res.send('POST request to the homepage');
})
