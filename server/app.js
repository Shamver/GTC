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
const userApi2 = require('./routes/UserRouter.js');

const boardPostApi = require('./routes/board/BoardPostRouter');

const userApi = require('./routes/user/UserRouter');
const userAlertApi = require('./routes/user/UserAlertRouter');
const userIgnoreApi = require('./routes/user/UserIgnoreRouter');
const userFavoritePostApi = require('./routes/user/UserFavoritePostRouter');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('jwt-secret', jwtConfig.secret);

app.use('/api/auth', authApi);
app.use('/api/user', authMiddleware);
app.use('/api/user', userApi2);
app.use('/api/board', boardApi);

app.use('/api/board', boardPostApi);

app.use('/api/user', userApi);
app.use('/api/user', userAlertApi);
app.use('/api/user', userIgnoreApi);
app.use('/api/user', userFavoritePostApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
