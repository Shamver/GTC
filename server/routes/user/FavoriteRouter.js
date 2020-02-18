const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_FAVORITE_LIST = `
  SELECT GBP.TITLE AS postTitle
  , GUF.POST_ID AS postId
  , date_format(GBP.DATE, '%Y-%m-%d %H:%i:%s') AS postDate
  , GUF.DATE AS favoriteDate
  , GBP.VIEWS AS postViews
  FROM GTC_USER_FAVORITE GUF LEFT JOIN GTC_BOARD_POST GBP
  ON GUF.POST_ID = GBP.ID
  WHERE GUF.USER_ID = :USER_ID
  ORDER BY favoriteDate DESC
`;

const SELECT_USER_FAVORITE = `
  SELECT * FROM GTC_USER_FAVORITE
  WHERE USER_ID = :USER_ID AND POST_ID = :BP_ID
`;

const INSERT_USER_FAVORITE = `
  INSERT INTO GTC_USER_FAVORITE
  VALUES(
    :USER_ID
    , :BP_ID
    , sysdate()
    )
`;

const DELETE_USER_FAVORITE = `
  DELETE FROM GTC_USER_FAVORITE
  WHERE POST_ID = :BP_ID AND USER_ID = :USER_ID
`;

// 우선은 어차피 포스트만 즐겨찾기 대상이기 때문에 루트로만 라우팅. 추가적으로 생기면 진행.
router.get('/', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_FAVORITE_LIST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get FavoriteList Success');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  const { userId, bpId } = data;

  Database.execute(
    (database) => database.query(
      SELECT_USER_FAVORITE,
      {
        USER_ID: userId,
        BP_ID: parseInt(bpId, 10),
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          res.send({
            POST_SUCCESS: false,
            MESSAGE: '😓 이미 즐겨찾기된 게시물입니다ㅠ',
          });
          throw new Error('이미 즐겨찾기된 게시물입니다.');
        } else {
          return database.query(
            INSERT_USER_FAVORITE,
            {
              USER_ID: userId,
              BP_ID: parseInt(bpId, 10),
            },
          );
        }
      })
      .then(() => {
        res.send(200);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Insert Favorite Success');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

router.delete('/', (req, res) => {
  const data = req.body;
  const { bpId, userId } = data;

  Database.execute(
    (database) => database.query(
      DELETE_USER_FAVORITE,
      {
        USER_ID: userId,
        BP_ID: bpId,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Delete Favorite Success');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

module.exports = router;
