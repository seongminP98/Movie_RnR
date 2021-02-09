const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const db = require('./lib/db');

const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send(`home`);
});
const passport = require('./lib/passport')(app);
const postRouter = require('./routes/post');
const joinRouter = require('./routes/join')(passport);
const authRouter = require('./routes/auth')(passport);

app.use('/post', postRouter);
app.use('/join', joinRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  //에러핸들러
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 3000!');
});
