const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const jwtConfig = require('./config/jwt-config');
const { info } = require('./log-config');

const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const boardApi = require('./routes/board/BoardRouter.js');
const authApi = require('./routes/user/AuthRouter.js');
const userApi = require('./routes/user/UserRouter.js');
const boardReplyApi = require('./routes/board/ReplyRouter.js');
const boardPostApi = require('./routes/board/PostRouter');
const userAlertApi = require('./routes/user/AlertRouter');
const userIgnoreApi = require('./routes/user/IgnoreRouter');
const userFavoriteApi = require('./routes/user/FavoriteRouter');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

// auth
app.use('/api/auth', authApi);

// user
app.use('/api/user', authMiddleware);
app.use('/api/user', userApi);
app.use('/api/user/alert', userAlertApi);
app.use('/api/user/ignore', userIgnoreApi);
app.use('/api/user/favorite', userFavoriteApi);

// post
// 안에서 authMiddleWare 처리
app.use('/api/board/post', boardPostApi);

// reply
app.use('/api/board/reply', authMiddleware);
app.use('/api/board/reply', boardReplyApi);

// board
// authMiddleware 때문에 하단 위치
app.use('/api/board', authMiddleware);
app.use('/api/board', boardApi);

const port = process.env.PORT || 3001;
app.listen(port, () => info(`Listening on port ${port}...`));
