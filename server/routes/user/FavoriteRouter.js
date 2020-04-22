const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_FAVORITE_LIST = `
  SELECT 
    GBP.TITLE AS postTitle
    , GUF.POST_ID AS postId
    , DATE_FORMAT(GBP.CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS postDate
    , GUF.CRT_DTTM AS favoriteDate
    , GBP.VIEW_CNT AS postViews
  FROM 
    GTC_USER_FAVORITE GUF 
    LEFT JOIN GTC_POST GBP
    ON GUF.POST_ID = GBP.ID
  WHERE GUF.USER_ID = :USER_ID
  ORDER BY GUF.CRT_DTTM DESC
`;

const SELECT_USER_FAVORITE = `
  SELECT 
    * 
  FROM GTC_USER_FAVORITE
  WHERE 
    USER_ID = :USER_ID 
    AND POST_ID = :POST_ID
`;

const INSERT_USER_FAVORITE = `
  INSERT INTO GTC_USER_FAVORITE (
    USER_ID
    , POST_ID
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , :POST_ID
    , SYSDATE()
  )
`;

const DELETE_USER_FAVORITE = `
  DELETE FROM GTC_USER_FAVORITE
  WHERE 
    POST_ID = :POST_ID 
    AND USER_ID = :USER_ID
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
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '즐겨찾기 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/user/favorite] 유저 즐겨찾기 목록 조회');
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
        POST_ID: parseInt(bpId, 10),
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😓 이미 즐겨찾기된 게시물입니다.',
          });
          throw new Error('이미 즐겨찾기된 게시물입니다.');
        } else {
          return database.query(
            INSERT_USER_FAVORITE,
            {
              USER_ID: userId,
              POST_ID: parseInt(bpId, 10),
            },
          );
        }
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 즐겨찾기에 해당 게시물이 추가되었습니다.',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/user/favorite] 유저 즐겨찾기 추가');
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
        POST_ID: bpId,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 즐겨찾기에서 해당 게시물이 삭제되었습니다.',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[DELETE, DELETE /api/user/favorite] 유저 즐겨찾기 삭제');
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
