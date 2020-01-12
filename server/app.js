const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const jwtConfig = require('./config/jwt-config');

const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const boardApi = require('./routes/BoardRouter.js');
const authApi = require('./routes/AuthRouter.js');

const boardPostApi = require('./routes/board/PostRouter');

const boardReplyApi = require('./routes/board/ReplyRouter');

const userApi = require('./routes/user/UserRouter');
const userAlertApi = require('./routes/user/AlertRouter');
const userIgnoreApi = require('./routes/user/IgnoreRouter');
const userFavoriteApi = require('./routes/user/FavoriteRouter');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

app.use('/api/auth', authApi);
app.use('/api/user', authMiddleware);
app.use('/api/board', boardApi);

app.use('/api/board/post', boardPostApi);
app.use('/api/board/reply', boardReplyApi);

app.use('/api/user', userApi);
app.use('/api/user/alert', userAlertApi);
app.use('/api/user/ignore', userIgnoreApi);
app.use('/api/user/favorite', userFavoriteApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
