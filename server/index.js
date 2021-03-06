const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const db = require('./lib/db');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./lib/passport');
passportConfig();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const postRouter = require('./routes/post');
const joinRouter = require('./routes/join');
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comment');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');

const options ={
  host: 'localhost',
  port: 3306,
  user: 'psm',
  password: '111111',
  database: 'movie_rnr'
}
const sessionStore = new MySQLStore(options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser('keyboard'));
app.use(
  session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.send(`home`);
});

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/join', joinRouter);
app.use('/comment',commentRouter);
app.use('/user',userRouter);
app.use('/search',searchRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  //에러핸들러
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
