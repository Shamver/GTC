const express = require('express');
const bodyParser = require('body-parser');
const sessionParser = require('express-session');

const app = express();
app.use(sessionParser({
  secret: 'shamp0114',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = require('./routes/index.js');
const postApi = require('./routes/PostRouter.js');
const userApi = require('./routes/UserRouter.js');

app.use(bodyParser.json());
app.use('/api', api);
app.use('/api', postApi);
app.use('/api', userApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
