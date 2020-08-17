const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const jwtConfig = require('./config/jwt-config');
const { info } = require('./log-config');

const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000,
}));
app.use(bodyParser.json({
  limit: '50mb',
}));

const boardApi = require('./routes/board/BoardRouter.js');
const authApi = require('./routes/user/AuthRouter.js');
const userApi = require('./routes/user/UserRouter.js');
const boardReplyApi = require('./routes/board/ReplyRouter.js');
const boardPostApi = require('./routes/board/PostRouter');
const boardReportApi = require('./routes/board/ReportRouter');
const userAlertApi = require('./routes/user/AlertRouter');
const userIgnoreApi = require('./routes/user/IgnoreRouter');
const userFavoriteApi = require('./routes/user/FavoriteRouter');
const userPointApi = require('./routes/user/PointRouter');
const userMailApi = require('./routes/user/MailRouter');
const cookieLatelyApi = require('./routes/cookie/LatelyRouter');
const eventDailyApi = require('./routes/event/DailyRouter');
const eventAdvertiseApi = require('./routes/event/AdvertiseRouter');
const systemCodeApi = require('./routes/system/CodeRouter');
const systemBoardApi = require('./routes/system/BoardRouter');
const fileApi = require('./routes/util/FileRouter');
const consultApi = require('./routes/consult/ConsultRouter');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

// auth
app.use('/api/auth', authApi);

// util
app.use('/api/util/file', fileApi);

// user
app.use('/api/user', authMiddleware);
app.use('/api/user', userApi);
app.use('/api/user/alert', userAlertApi);
app.use('/api/user/ignore', userIgnoreApi);
app.use('/api/user/favorite', userFavoriteApi);
app.use('/api/user/point', userPointApi);
app.use('/api/user/mail', userMailApi);

// consult
app.use('/api/consult', consultApi);

// post
// 안에서 authMiddleWare 처리
app.use('/api/board/post', boardPostApi);

// reply
app.use('/api/board/reply', boardReplyApi);

// Report
app.use('/api/board/Report', authMiddleware);
app.use('/api/board/Report', boardReportApi);

// board
app.use('/api/board', boardApi);

app.use('/api/cookie/lately', cookieLatelyApi);

app.use('/api/event/daily', eventDailyApi);
app.use('/api/event/advertise', eventAdvertiseApi);

app.use('/api/system/code', systemCodeApi);
app.use('/api/system/board', systemBoardApi);

const port = process.env.PORT || 3001;
app.listen(port, () => info(`Listening on port ${port}...`));
