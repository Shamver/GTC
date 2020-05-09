const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // read the token from header or url
  const { authToken } = req.cookies;
  const token = authToken;

  // token does not exist
  if (!token) {
    return res.json({
      success: false,
      code: 0,
      message: '로그인 정보가 알맞지 않습니다.',
    });
  }

  // create a promise that decodes the token
  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    },
  );

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.json({
      success: false,
      code: 0,
      message: error.message,
    });
  };

  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);

  return true;
};

module.exports = authMiddleware;
