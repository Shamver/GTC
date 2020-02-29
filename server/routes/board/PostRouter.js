const express = require('express');

const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { set } = require('../../middleware/latelyCookie');

const { error, info } = require('../../log-config');

const Database = require('../../Database');

const point = require('../../middleware/point');

const SELECT_BOARD_POST_LIST = `
  SELECT 
    @rownum:=@rownum+1 as rn
      , (SELECT Ceil(COUNT(*)/25) FROM GTC_BOARD_POST WHERE B_ID = ':B_ID') AS pageCount
      , P.ID AS id
      , P.TITLE AS title
      , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
      , P.WRITER AS idWriter
      , IF(BC_ID = 'FREE','자유','그외') as categoryName
      , P.DEPTH AS depth
      , if(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.DATE, '%Y%m%d'),DATE_FORMAT(P.DATE, '%H:%i'),DATE_FORMAT(P.DATE, '%m-%d')) AS date
      , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R01') as recommendCount
      , ( SELECT COUNT(*) AS count FROM GTC_BOARD_REPLY WHERE BP_ID=P.id AND DELETE_YN = 'N') as replyCount
  FROM GTC_BOARD_POST P, (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
  WHERE B_ID = ':B_ID' AND P.WRITER != IFNULL(( SELECT TARGET_ID FROM GTC_USER_IGNORE WHERE FROM_ID =:USER_ID), -1)
  ORDER BY ID DESC    
  LIMIT :CURRENT_PAGE, 25
`;

const INSERT_BOARD_POST = `
  INSERT INTO GTC_BOARD_POST
  VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_BOARD_POST) as temp),
    ':BOARD',
    ':CATEGORY',
    null,
    ':TITLE',
    ':WRITER',
    sysdate(),
    0,
    ':CONTENT',
    :DEPTH,
    ':SECRET',
    ':SECRET_REPLY_ALLOW',
    ':REPLY_ALLOW'
  )
`;

const SELECT_BOARD_POST_MAX_ID = `
  SELECT IFNULL(MAX(ID), 1) AS id FROM GTC_BOARD_POST
`;

const SELECT_BOARD_POST_RECOMMEND_DUPLICATE_CHECK = `
  SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND
  WHERE ID = :ID
  AND U_ID = :U_ID
`;

const INSERT_BOARD_POST_RECOMMEND = `
  INSERT INTO GTC_BOARD_POST_RECOMMEND
  VALUES (
    :ID,
    :U_ID,
    ':TYPE'
  )
`;

const SELECT_BOARD_POST_MINE = `
  SELECT 
    ID AS postId
    , TITLE AS postTitle
    , date_format(DATE, '%Y-%m-%d %H:%i:%s') AS postDate
    , VIEWS AS postViews
  FROM GTC_BOARD_POST
  WHERE WRITER = :USER_ID
  ORDER BY ID DESC
`;

const SELECT_BOARD_POST_SINGLE = `
  SELECT 
  P.ID AS id
  , P.B_ID AS board
  , if(P.B_ID = 'FREE','자유게시판','그외') as boardName
  , BC_ID AS category
  , if(P.BC_ID = 'FREE','자유','그외') as categoryName
  , if((SELECT F.POST_ID FROM GTC_USER_FAVORITE F WHERE F.USER_ID = :USER_ID AND F.POST_ID = P.ID), true, false) as isFavorite
  , P.TITLE AS title
  , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
  , P.DEPTH AS depth
  , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R01') as recommendCount
  , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R02') as notRecommendCount
  , CASE WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
        WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE,DATE, SYSDATE()),'분 전')
        WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR,DATE, SYSDATE()),'시간 전')
        WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY,DATE, SYSDATE()),'일 전')
        WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH,DATE, SYSDATE()),'달 전')
     ELSE CONCAT(TIMESTAMPDIFF(YEAR,DATE, SYSDATE()),'년 전')
  END  as date
  , P.CONTENT AS content
  , P.VIEWS AS views
  , P.SECRET as secret
  , P.SECRET_REPLY_ALLOW as secretReplyAllow
  , P.REPLY_ALLOW as replyAllow
  FROM GTC_BOARD_POST P 
  WHERE ID = :POST_ID
`;

const UPDATE_BOARD_POST_VIEWS = `
  UPDATE GTC_BOARD_POST
    SET VIEWS = VIEWS + 1
    WHERE ID = :POST_ID
`;

const SELECT_BOARD_POST_UPPER_AND_LOWER = `
  SELECT *, IF(id > :POST_ID, 'upper', 'lower') AS upperOrLower FROM (
    SELECT 
      @ROWNUM := @ROWNUM + 1 as rn
      , P.ID AS id
      , P.TITLE AS title
      , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
    FROM GTC_BOARD_POST P, (SELECT @ROWNUM := 0) AS TEMP
    WHERE B_ID = (SELECT B_ID FROM GTC_BOARD_POST WHERE ID = :POST_ID)
    ORDER BY ID DESC    
  ) AS B
  WHERE B.rn IN (
    ((SELECT rn FROM (
      SELECT 
        @ROWNUM2 := @ROWNUM2 + 1 as rn 
          , P.ID AS id
          FROM GTC_BOARD_POST P,  (SELECT @ROWNUM2 := 0) AS TEMP
          WHERE P.B_ID = (SELECT B_ID FROM GTC_BOARD_POST WHERE ID = :POST_ID)
          ORDER BY ID DESC   
      ) AS A
      WHERE A.id = :POST_ID) + 1),
      ((SELECT rn FROM (
      SELECT 
        @ROWNUM3 := @ROWNUM3 + 1 as rn 
          , P.ID AS id
          FROM GTC_BOARD_POST P,  (SELECT @ROWNUM3 := 0) AS TEMP
          WHERE P.B_ID = (SELECT B_ID FROM GTC_BOARD_POST WHERE ID = :POST_ID)
          ORDER BY ID DESC   
    ) AS A
    WHERE A.id = :POST_ID) - 1)
  )
`;

router.get('/', (req, res) => {
  let { currentPage } = req.query;
  const { board, userId } = req.query;
  currentPage = currentPage || 1;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_LIST,
      {
        B_ID: board.toUpperCase(),
        CURRENT_PAGE: ((currentPage - 1) * 25),
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '게시물 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/post] 게시물 목록 조회');
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

router.use('/', authMiddleware);
router.post('/', (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_BOARD_POST,
      {
        BOARD: data.board,
        CATEGORY: data.category,
        TITLE: data.title,
        WRITER: data.writer,
        CONTENT: data.content,
        DEPTH: data.depth,
        SECRET: data.secret,
        SECRET_REPLY_ALLOW: data.secretReplyAllow,
        REPLY_ALLOW: data.replyAllow,
      },
    )
      .then(() => database.query(
        SELECT_BOARD_POST_MAX_ID,
        {},
      ))
      .then((rows) => {
        const postData = {
          ...data,
          bpId: rows[0].id,
        };

        point('addPost', 'POST', postData);
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 포스팅이 등록되었어요!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/board/post] 게시물 등록');
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

// 게시글 추천
router.post('/recommend', (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_RECOMMEND_DUPLICATE_CHECK,
      {
        ID: data.id,
        U_ID: data.uId,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😳 이미 해당 포스팅에 투표가 완료되었어요!',
          });
          throw new Error('이미 해당 글에 투표가 되어 있습니다');
        }

        return database.query(
          INSERT_BOARD_POST_RECOMMEND,
          {
            ID: data.id,
            U_ID: data.uId,
            TYPE: data.type,
          },
        );
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😳 해당 포스팅 투표 완료!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/board/post/recommend] 게시물 추천 투표');
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

router.get('/mine', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_MINE,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '내가 쓴 게시물 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/post/mine] 내가 쓴 게시물 조회');
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

router.get('/:id', (req, res) => {
  let postItem;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_SINGLE,
      {
        POST_ID: req.params.id,
        USER_ID: req.query.userId,
      },
    )
      .then((rows) => {
        postItem = rows;
        return database.query(
          UPDATE_BOARD_POST_VIEWS,
          {
            POST_ID: req.params.id,
          },
        );
      })
      .then(() => {
        const { lately } = req.cookies;
        const list = set(lately, req.params.id);
        res.cookie('lately', list, { httpOnly: true });

        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '게시글 조회',
          DATA: postItem,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/post/:id] 단일 게시물 조회');
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

router.get('/:id/upperLower', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_UPPER_AND_LOWER,
      {
        POST_ID: req.params.id,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '게시글 위 아래 글 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/post/:id/upperLower] 단일 게시글 위 아래 글 조회');
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
