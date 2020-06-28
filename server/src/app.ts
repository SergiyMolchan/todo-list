import express = require('express');
// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
res.send('Hello World!');
});

app.get('/test', function (req, res) {
  res.json({status: 'tests ok'});
});

app.listen(4000, function () {
console.log('App is listening on port 4000!');
});