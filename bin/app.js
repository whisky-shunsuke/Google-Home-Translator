var firebase = require("firebase");

//firebase config
var config = {
  apiKey: "###################################",
  authDomain: "####################################",
  databaseURL: "########################################",
  projectId: "#####################################",
  storageBucket: "#################################",
  messagingSenderId: "#############################3"
};
firebase.initializeApp(config);

//jsonからvalueに一致する値取得
const getJsonData = (value, json) => {
console.log('100-------------------');
  for (var name in json)  if (value == name) return json[name]
  return json["default"]
}

//database更新時
const path = "/googlehome";
const key = "name";
const db = firebase.database();

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

db.ref(path).on("value", function(changedSnapshot) {
console.log('200-------------------');
    const value = changedSnapshot.child(key).val();
console.log(value);
//    app.post('/', function(req, res,next) {
console.log('300-------------------'); 
        const text = value;
    
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
//        res.send('POST request to the homepage');
//    })

});
