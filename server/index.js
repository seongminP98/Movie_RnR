const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const db = require('./lib/db');
const topicRouter = require('./routes/topic');

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
  res.send(`home`);
});

app.use('/topic', topicRouter);


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
 
app.use(function (err, req, res, next) { //에러핸들러
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 3000!');
});
