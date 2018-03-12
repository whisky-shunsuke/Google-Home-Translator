const googlehome = require('google-home-notifier')
const language = 'ja';

googlehome.device('Google-Home', language); 

googlehome.notify('こんにちは。私はグーグルホームです。', function(res) {
  console.log(res);
});
