const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/', express.static(`${__dirname}/../public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const api = require('./routes/index.js');
const postApi = require('./routes/PostRouter.js');

app.use(bodyParser.json());
app.use('/api', api);
app.use('/api', postApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
