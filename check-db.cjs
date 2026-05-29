const https = require('https');

const urls = [
  'https://english-quest-d41b5-default-rtdb.firebaseio.com/.json',
  'https://english-quest-d41b5-default-rtdb.asia-southeast1.firebasedatabase.app/.json',
  'https://english-quest-d41b5-default-rtdb.europe-west1.firebasedatabase.app/.json'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(url, res.statusCode, data));
  }).on('error', err => console.log(url, err.message));
});
