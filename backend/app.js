require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const NotFoundError = require('./errors/notFoundError');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;

const corsOption = {
  origin: ['https://mesto.nomoreparties.co/v1/cohort-64', 'https://mesto.nomoreparties.co/v1/cohort-64', 'https://mesto.nomoreparties.co/v1/cohort-64', 'https://mesto.nomoreparties.co/v1/cohort-64', 'http://localhost:3001', 'http://localhost:3000', 'https://domainname.nikitapro.nomoreparties.co', 'https://api.domainname.nikitapro.nomoreparties.co'],
  credentials: true,
  // preflightContinue: true,
};

const app = express();
app.use(cors(corsOption));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/signup', signup);
app.use('/signin', signin);

app.use(auth);

app.use('/users', users);
app.use('/cards', cards);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  console.log('Connected to db');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    if (BASE_PATH) {
      console.log('Ссылка на сервер');
      console.log(BASE_PATH);
    }
  });
}

main();
