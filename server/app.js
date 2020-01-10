const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const jwtConfig = require('./config/jwt-config');

const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = require('./routes/index.js');
const boardApi = require('./routes/BoardRouter.js');
const authApi = require('./routes/AuthRouter.js');
const userApi = require('./routes/UserRouter.js');
const settingApi = require('./routes/SettingRouter.js');
const postlockerApi = require('./routes/PostlockerRouter.js');
const replyApi = require('./routes/ReplyRouter.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

app.use('/api', api);


app.use('/api/board', boardApi);

app.use('/api/auth', authApi);

app.use('/api/user', authMiddleware);
app.use('/api/user', userApi);
app.use('/api/setting', settingApi);
app.use('/api/postlocker', postlockerApi);
app.use('/api/', authMiddleware);
app.use('/api/', replyApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
