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
const postApi = require('./routes/board/PostRouter.js');
const authApi = require('./routes/user/AuthRouter.js');
const userApi = require('./routes/user/UserRouter.js');
const settingApi = require('./routes/SettingRouter.js');
const postlockerApi = require('./routes/PostlockerRouter.js');
const replyApi = require('./routes/board/ReplyRouter.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

app.use('/api/setting', settingApi);
app.use('/api/postlocker', postlockerApi);

// auth
app.use('/api/auth', authApi);

// user
app.use('/api/user', authMiddleware);
app.use('/api/user', userApi);

// post
// 안에서 authMiddleWare 처리
app.use('/api/board/post', postApi);

// reply
app.use('/api/board/reply', authMiddleware);
app.use('/api/board/reply', replyApi);

// board
// authMiddleware 때문에 하단 위치
app.use('/api/board', authMiddleware);
app.use('/api/board', boardApi);

const port = process.env.PORT || 3001;
app.listen(port, () => info(`Listening on port ${port}...`));
