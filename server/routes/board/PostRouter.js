const express = require('express');

const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { set } = require('../../middleware/latelyCookie');

const { info } = require('../../log-config');

const Database = require('../../Database');

const point = require('../../middleware/point');

// 추후 코드 테이블 조인 수정 예정
const SELECT_POST_LIST = `
  SELECT 
    @ROWNUM := @ROWNUM+1 AS rn
    , P.ID AS id
    , P.TITLE AS title
    , P.USER_ID AS writerId
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = ('BOARD_' || ':BOARD_CD' || '_CATEGORY') AND CODE = P.CATEGORY_CD) AS categoryName
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(P.CRT_DTTM, '%H:%i'), DATE_FORMAT(P.CRT_DTTM, '%m-%d')) AS date
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') AS recommendCount
    , (SELECT COUNT(*) AS count FROM GTC_COMMENT WHERE POST_ID = P.ID AND DELETE_FL = 0) AS commentCount
    , (SELECT CEIL(COUNT(*)/25) FROM GTC_POST PT WHERE PT.BOARD_CD = ':BOARD_CD' 
        AND PT.USER_ID NOT IN
        (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
        AND (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = PT.ID AND TYPE_CD = 'R01') >= :LIKES
      ) AS pageCount
    , (SELECT COUNT(*) AS count FROM GTC_POST WHERE CONTENT LIKE '%<figure class="image">%' AND ID = P.ID) AS isImage
  FROM 
    GTC_POST P
    , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
  WHERE 
    BOARD_CD = ':BOARD_CD' 
    AND P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
    AND (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') >= :LIKES
  ORDER BY ID DESC    
  LIMIT :CURRENT_PAGE, :PER_PAGE
`;

const SELECT_POST_NOTICE_LIST = `
  SELECT 
    P.ID AS id
    , P.TITLE AS title
    , P.USER_ID AS writerId
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = ('BOARD_' || ':BOARD_CD' || '_CATEGORY') AND CODE = P.CATEGORY_CD) AS categoryName
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(P.CRT_DTTM, '%H:%i'), DATE_FORMAT(P.CRT_DTTM, '%m-%d')) AS date
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') as recommendCount
    , (SELECT COUNT(*) AS count FROM GTC_COMMENT WHERE POST_ID = P.ID AND DELETE_FL = 0) as commentCount
  FROM 
    GTC_POST P
  WHERE 
    BOARD_CD = ':BOARD_CD' 
    AND P.NOTICE_FL = 1
  ORDER BY ID DESC
`;

const SELECT_POST_LIST_ALL = `
  SELECT 
    @ROWNUM := @ROWNUM+1 as rn
    , P.ID AS id
    , P.TITLE AS title
    , P.USER_ID AS writerId
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = ('BOARD_' || ':BOARD_CD' || '_CATEGORY') AND CODE = P.CATEGORY_CD) AS categoryName
    , CASE WHEN BOARD_CD = 'FREE' THEN '자유 게시판'
        WHEN BOARD_CD = 'TRADE' THEN '아이템 거래'
        WHEN BOARD_CD = 'CASH' THEN '월드락 거래'
        WHEN BOARD_CD = 'QNA' THEN '질문 & 답변'
       ELSE '그 외'
    END AS boardName
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(P.CRT_DTTM, '%H:%i'), DATE_FORMAT(P.CRT_DTTM, '%m-%d')) AS date
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') as recommendCount
    , (SELECT COUNT(*) AS count FROM GTC_COMMENT WHERE POST_ID = P.ID AND DELETE_FL = 0) as commentCount
    , (SELECT CEIL(COUNT(*)/25) FROM GTC_POST WHERE BOARD_CD NOT IN ('qna','faq','consult','crime')) AS pageCount
  FROM 
    GTC_POST P
    , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
  WHERE 
    BOARD_CD NOT IN ('qna','faq','consult','crime') 
    AND P.USER_ID NOT IN 
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
    AND (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') >= :LIKES
  ORDER BY ID DESC    
  LIMIT :CURRENT_PAGE, :PER_PAGE
`;

const INSERT_POST = `
  INSERT INTO GTC_POST (
    BOARD_CD
    , CATEGORY_CD
    , TITLE
    , USER_ID
    , CONTENT
    , NOTICE_FL
    , SECRET_FL
    , SECRET_COMMENT_ALLOW_FL
    , COMMENT_ALLOW_FL
  ) VALUES (
    ':BOARD_CD'
    , ':CATEGORY_CD'
    , ':TITLE'
    , :USER_ID
    , ':CONTENT'
    , :NOTICE_FL
    , :SECRET_FL
    , :SECRET_COMMENT_ALLOW_FL
    , :COMMENT_ALLOW_FL
  )
`;

const SELECT_POST_RECOMMEND_DUPLICATE_CHECK = `
  SELECT 
    COUNT(*) AS count 
  FROM GTC_POST_RECOMMEND
  WHERE 
    POST_ID = :POST_ID
    AND USER_ID = :USER_ID
`;

const INSERT_POST_RECOMMEND = `
  INSERT INTO GTC_POST_RECOMMEND (
    POST_ID
    , USER_ID
    , TYPE_CD
  ) VALUES (
    :POST_ID
    , :USER_ID
    , ':TYPE_CD'
  )
`;

const SELECT_MINE_POST = `
  SELECT 
    ID AS postId
    , TITLE AS postTitle
    , DATE_FORMAT(CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS postDate
    , VIEW_CNT AS viewCnt
  FROM GTC_POST
  WHERE USER_ID = :USER_ID
  ORDER BY ID DESC
`;

const SELECT_POST_SINGLE = `
  SELECT 
    P.ID AS id
    , P.BOARD_CD AS board
    , IF(P.BOARD_CD = 'FREE','자유 게시판','그외') AS boardName
    , CATEGORY_CD AS category
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = ('BOARD_' || ':BOARD_CD' || '_CATEGORY') AND CODE = P.CATEGORY_CD) AS categoryName
    , IF((SELECT F.POST_ID FROM GTC_USER_FAVORITE F WHERE F.USER_ID = :USER_ID AND F.POST_ID = P.ID), 1, 0) AS isFavorite
    , P.TITLE AS title
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , P.USER_ID AS writerId
    , (SELECT U.PROFILE FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerProfile
    , IF(P.USER_ID = :USER_ID, 1, 0) AS isMyPost
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') AS recommendCount
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R02') AS notRecommendCount
    , (SELECT GTC_POST_RECOMMEND.TYPE_CD FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND USER_ID = :USER_ID) AS recommendCheck
    , CASE WHEN CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE() ,INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
           WHEN CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE() ,INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, CRT_DTTM, SYSDATE()), '분 전')
           WHEN CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE() ,INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, CRT_DTTM, SYSDATE()), '시간 전')
           WHEN CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE() ,INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, CRT_DTTM, SYSDATE()), '일 전')
           WHEN CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE() ,INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, CRT_DTTM, SYSDATE()), '달 전')
      ELSE CONCAT(TIMESTAMPDIFF(YEAR, CRT_DTTM, SYSDATE()),'년 전')
      END AS date
    , P.CONTENT AS content
    , P.VIEW_CNT AS viewCnt
    , P.SECRET_FL AS secretFl
    , P.SECRET_COMMENT_ALLOW_FL AS secretCommentAllowFl
    , P.COMMENT_ALLOW_FL AS commentAllowFl
  FROM GTC_POST P 
  WHERE ID = :POST_ID
`;

const UPDATE_POST_VIEW_CNT = `
  UPDATE GTC_POST
    SET VIEW_CNT = VIEW_CNT + 1
  WHERE ID = :POST_ID
`;

const SELECT_POST_UPPER_AND_LOWER = `
  SELECT 
    *
    , IF(ID > :POST_ID, 1, 0) AS isUpper 
  FROM (
    SELECT
      @ROWNUM := @ROWNUM + 1 AS rn
      , P.ID AS id
      , P.TITLE AS title
      , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writer
    FROM GTC_POST P, (SELECT @ROWNUM := 0) AS TEMP
    WHERE BOARD_CD = (SELECT BOARD_CD FROM GTC_POST WHERE ID = :POST_ID)
    AND P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
    ORDER BY ID DESC    
  ) AS B
  WHERE B.RN IN (
    ((SELECT RN FROM (
        SELECT 
          @ROWNUM2 := @ROWNUM2 + 1 AS RN 
          , P.ID AS ID
        FROM GTC_POST P, (SELECT @ROWNUM2 := 0) AS TEMP
        WHERE P.BOARD_CD = (SELECT BOARD_CD FROM GTC_POST WHERE ID = :POST_ID)
        AND P.USER_ID NOT IN
          (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
        ORDER BY ID DESC   
      ) AS A
      WHERE A.ID = :POST_ID) + 1),
      ((SELECT RN FROM (
        SELECT 
          @ROWNUM3 := @ROWNUM3 + 1 AS RN 
            , P.ID AS ID
            FROM GTC_POST P, (SELECT @ROWNUM3 := 0) AS TEMP
            WHERE P.BOARD_CD = (SELECT BOARD_CD FROM GTC_POST WHERE ID = :POST_ID)
            AND P.USER_ID NOT IN
              (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
            ORDER BY ID DESC   
      ) AS A
      WHERE A.ID = :POST_ID) - 1
    )
  )
`;

const UPDATE_POST = `
  UPDATE GTC_POST 
  SET 
    BOARD_CD = ':BOARD_CD'
    , CATEGORY_CD = ':CATEGORY_CD'
    , TITLE = ':TITLE'
    , CONTENT = ':CONTENT'
    , SECRET_FL = :SECRET_FL
    , SECRET_COMMENT_ALLOW_FL = :SECRET_COMMENT_ALLOW_FL
    , COMMENT_ALLOW_FL = :COMMENT_ALLOW_FL
    , MFY_DTTM = SYSDATE()
   WHERE ID = :POST_ID 
`;

const DELETE_POST = `
  DELETE FROM GTC_POST 
  WHERE ID = :POST_ID 
`;

const SELECT_POST_WRITER = `
  SELECT 
    IF(P.USER_ID = :USER_ID, 1, 0) AS isMyPost
  FROM GTC_POST P 
  WHERE ID = :POST_ID
`;

const SELECT_LAST_INDEX = `
  SELECT LAST_INSERT_ID() as id
`;


const SELECT_POST_LIST_SEARCH = `
  SELECT 
    @ROWNUM := @ROWNUM+1 AS rn
    , P.ID AS id
    , P.TITLE AS title
    , P.USER_ID AS writerId
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(P.CRT_DTTM, '%H:%i'), DATE_FORMAT(P.CRT_DTTM, '%m-%d')) AS date
    , (SELECT COUNT(*) AS count FROM GTC_COMMENT WHERE POST_ID = P.ID AND DELETE_FL = 0) AS commentCount
    , (SELECT CEIL(COUNT(*)/25) FROM GTC_POST P LEFT JOIN GTC_USER GU ON P.USER_ID = GU.ID WHERE 
      P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
        AND (
          P.CONTENT LIKE '%:KEYWORD%'
          OR P.TITLE LIKE '%:KEYWORD%'
          OR GU.NICKNAME LIKE '%:KEYWORD%'
        )
      ) AS pageCount
    , (SELECT COUNT(*) FROM GTC_POST P LEFT JOIN GTC_USER GU ON P.USER_ID = GU.ID WHERE 
      P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
        AND (
          P.CONTENT LIKE '%:KEYWORD%'
          OR P.TITLE LIKE '%:KEYWORD%'
          OR GU.NICKNAME LIKE '%:KEYWORD%'
        )
      ) AS count
    , P.CONTENT AS content
    , (SELECT COUNT(*) AS count FROM GTC_POST WHERE CONTENT LIKE '%<figure class="image">%' AND ID = P.ID) AS isImage
  FROM 
    GTC_POST P
    LEFT JOIN GTC_USER GU
    ON P.USER_ID = GU.ID
    , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
  WHERE 
    P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
    AND (
      P.CONTENT LIKE '%:KEYWORD%'
      OR P.TITLE LIKE '%:KEYWORD%'
      OR GU.NICKNAME LIKE '%:KEYWORD%'
    )
  ORDER BY ID DESC    
  LIMIT :CURRENT_PAGE, :PER_PAGE
`;

const SELECT_POST_LIST_BOARD_SEARCH = `
  SELECT 
    @ROWNUM := @ROWNUM+1 AS rn
    , P.ID AS id
    , P.TITLE AS title
    , P.USER_ID AS writerId
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.USER_ID) AS writerName
    , IF(CATEGORY_CD = 'FREE','자유','그외') AS categoryName
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(P.CRT_DTTM, '%H:%i'), DATE_FORMAT(P.CRT_DTTM, '%m-%d')) AS date
    , (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') AS recommendCount
    , (SELECT COUNT(*) AS count FROM GTC_COMMENT WHERE POST_ID = P.ID AND DELETE_FL = 0) AS commentCount
    , (SELECT CEIL(COUNT(*)/25) FROM GTC_POST P
        WHERE
        P.BOARD_CD IN (:BOARD_CD) 
        AND P.USER_ID NOT IN
          (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
        AND (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') >= :LIKES
        :query
      ) AS pageCount
    :ALL_QUERY
    , (SELECT COUNT(*) AS count FROM GTC_POST WHERE CONTENT LIKE '%<figure class="image">%' AND ID = P.ID) AS isImage
  FROM 
    GTC_POST P
    LEFT JOIN GTC_USER GU
    ON P.USER_ID = GU.ID
    , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
  WHERE 
    BOARD_CD IN (:BOARD_CD)
    AND P.USER_ID NOT IN
      (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
    AND (SELECT COUNT(*) AS count FROM GTC_POST_RECOMMEND WHERE POST_ID = P.ID AND TYPE_CD = 'R01') >= :LIKES
    :query
  ORDER BY ID DESC    
  LIMIT :CURRENT_PAGE, :PER_PAGE
`;

router.get('/', (req, res) => {
  let { currentPage } = req.query;
  const { board, isHome, recommend } = req.query;
  let { userId } = req.query;
  currentPage = currentPage || 1;
  if (!userId) userId = null;

  Database.execute(
    (database) => database.query(
      board !== 'all' ? SELECT_POST_LIST : SELECT_POST_LIST_ALL,
      {
        BOARD_CD: board.toUpperCase(),
        CURRENT_PAGE: ((currentPage - 1) * 25),
        USER_ID: userId,
        PER_PAGE: isHome ? 9 : 25,
        LIKES: Number(recommend) ? 1 : 0,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시글 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post] 게시글 목록 조회');
  });
});

router.get('/search', (req, res) => {
  let { currentPage } = req.query;
  const {
    target, keyword, board, recommend,
  } = req.query;
  let { userId } = req.query;
  currentPage = currentPage || 1;
  if (!userId) userId = null;

  let query;

  if (board === undefined) {
    query = `AND (
      P.CONTENT LIKE '%${keyword}%'
      OR P.TITLE LIKE '%${keyword}%'
      OR GU.NICKNAME LIKE '%${keyword}%'
    )`;
  } else {
    switch (target) {
      case 'title':
        query = `AND (
          P.TITLE LIKE '%${keyword}%'
        )`;
        break;

      case 'titleText':
        query = `AND (
          P.CONTENT LIKE '%${keyword}%'
          OR P.TITLE LIKE '%${keyword}%'
        )`;
        break;

      case 'nickname':
        query = `AND (
          GU.NICKNAME LIKE '%${keyword}%'
        )`;
        break;

      default:
        query = `AND (
          P.CONTENT LIKE '%${keyword}%'
          OR P.TITLE LIKE '%${keyword}%'
          OR GU.NICKNAME LIKE '%${keyword}%'
        )`;
        break;
    }
  }

  const ALL_QUERY = board && board === 'all'
    ? `, CASE WHEN P.BOARD_CD = 'FREE' THEN '자유 게시판'
        WHEN P.BOARD_CD = 'TRADE' THEN '아이템 거래'
        WHEN P.BOARD_CD = 'CASH' THEN '월드락 거래'
        WHEN P.BOARD_CD = 'QNA' THEN '질문 & 답변'
       ELSE '그 외'
    END AS boardName` : '';

  // eslint-disable-next-line no-nested-ternary
  const params = board === undefined ? {
    CURRENT_PAGE: ((currentPage - 1) * 25),
    USER_ID: userId,
    PER_PAGE: 25,
    KEYWORD: keyword,
  } : board && board !== 'all' ? {
    BOARD_CD: `'${board.toUpperCase()}'`,
    CURRENT_PAGE: ((currentPage - 1) * 25),
    USER_ID: userId,
    PER_PAGE: 25,
    LIKES: Number(recommend) ? 1 : 0,
    ALL_QUERY,
    query,
  } : {
    BOARD_CD: '\'notice\', \'free\', \'trade\', \'cash\', \'crime\', \'qna\'', // 후에 코드성으로 모두 가져오게끔 해서 처리
    CURRENT_PAGE: ((currentPage - 1) * 25),
    USER_ID: userId,
    PER_PAGE: 25,
    LIKES: Number(recommend) ? 1 : 0,
    ALL_QUERY,
    query,
  };

  Database.execute(
    (database) => database.query(
      board === undefined ? SELECT_POST_LIST_SEARCH : SELECT_POST_LIST_BOARD_SEARCH,
      params,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시글 목록 검색 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post/search] 게시글 목록 검색 조회');
  });
});

router.get('/notice', (req, res) => {
  const { board } = req.query;
  let { userId } = req.query;

  if (!userId) userId = null;

  Database.execute(
    (database) => database.query(
      SELECT_POST_NOTICE_LIST,
      {
        BOARD_CD: board.toUpperCase(),
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '공지 게시글 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post/notice] 공지 게시글 목록 조회');
  });
});

router.post('/', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_POST,
      {
        BOARD_CD: data.board,
        CATEGORY_CD: data.category,
        TITLE: data.title,
        USER_ID: data.writer,
        CONTENT: data.content,
        SECRET_FL: data.secret,
        SECRET_COMMENT_ALLOW_FL: data.secretReplyAllow,
        COMMENT_ALLOW_FL: data.replyAllow,
        NOTICE_FL: data.notice,
      },
    )
      .then(() => database.query(
        SELECT_LAST_INDEX,
        {},
      ))
      .then((rows) => {
        const postData = {
          ...data,
          bpId: rows[0].id,
        };

        point('addPost', 'POST', postData);
        res.json({
          success: true,
          code: 1,
          message: '😊 게시글이 등록되었어요!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/post] 게시글 등록');
  });
});

router.put('/', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_POST_WRITER,
      {
        POST_ID: data.id,
        USER_ID: data.userId,
      },
    )
      .then((rows) => {
        if (!rows[0].isMyPost) {
          // 본인 게시물이 아닐 경우 리젝
          return Promise.reject();
        }
        return database.query(
          UPDATE_POST,
          {
            POST_ID: data.id,
            BOARD_CD: data.board,
            CATEGORY_CD: data.category,
            TITLE: data.title,
            USER_ID: data.writer,
            CONTENT: data.content,
            SECRET_FL: data.secret,
            SECRET_COMMENT_ALLOW_FL: data.secretReplyAllow,
            COMMENT_ALLOW_FL: data.replyAllow,
          },
        );
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 포스팅이 수정되었어요!',
        });
      })
      .catch(() => {
        res.json({
          success: false,
          code: 1,
          message: '😳 본인의 게시물이 아닙니다.',
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post] 게시글 수정');
  });
});

router.delete('/', authMiddleware, (req, res) => {
  const data = req.query;

  Database.execute(
    (database) => database.query(
      DELETE_POST,
      {
        POST_ID: data.id,
      },
    )
      .then(() => {
        point('deletePost', 'POST', {
          bpId: data.id,
          writer: data.writer,
        });
        res.json({
          success: true,
          code: 1,
          message: '😊 포스팅이 삭제되었어요!',
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/board/post] 게시글 삭제');
  });
});

// 게시글 추천
router.post('/recommend', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_POST_RECOMMEND_DUPLICATE_CHECK,
      {
        POST_ID: data.id,
        USER_ID: data.uId,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          return Promise.reject();
        }

        return database.query(
          INSERT_POST_RECOMMEND,
          {
            POST_ID: data.id,
            USER_ID: data.uId,
            TYPE_CD: data.type,
          },
        );
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😳 포스팅 투표 완료!',
        });
      }, () => {
        res.json({
          success: true,
          code: 2,
          message: '😳 이미 해당 포스팅에 투표가 완료되었어요!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/post/recommend] 게시글 추천 투표');
  });
});

router.get('/mine', authMiddleware, (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_MINE_POST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '내가 쓴 게시글 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post/mine] 내가 쓴 게시글 조회');
  });
});

router.get('/:id', (req, res) => {
  let postItem;

  Database.execute(
    (database) => database.query(
      SELECT_POST_SINGLE,
      {
        POST_ID: req.params.id,
        USER_ID: req.query.userId ? req.query.userId : null,
      },
    )
      .then((rows) => {
        postItem = rows;
        return database.query(
          UPDATE_POST_VIEW_CNT,
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
          success: true,
          code: 1,
          message: '게시글 조회',
          result: postItem,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post/:id] 단일 게시글 조회');
  });
});

router.get('/:id/upperLower', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_POST_UPPER_AND_LOWER,
      {
        POST_ID: req.params.id,
        USER_ID: req.query.userId ? req.query.userId : null,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시글 위 아래 글 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/post/:id/upperLower] 단일 게시글 위 아래 글 조회');
  });
});

module.exports = router;
