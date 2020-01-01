import { action, observable } from 'mobx';
import axios from 'axios';
import React from 'react';

class BoardStore {
  @observable post = {
    board: '',
    category: '',
    title: '',
    text: '',
    depth: '',
    secret: 'N',
    replyAllow: 'N',
    secretReplyAllow: 'N',
  };

  @observable reply = {
    text: '',
    bpId: '',
  };

  @observable postView = {};

  @observable boards = [{
    value: 'NOTICE',
    name: '공지사항',
  }, {
    value: 'FREE',
    name: '자유 게시판',
  }, {
    value: 'TRADE',
    name: '아이템 거래',
  }, {
    value: 'CASH',
    name: '월드락 거래',
  }, {
    value: 'CRIME',
    name: '신고게시판',
  }, {
    value: 'Q&A',
    name: '질문 & 답변',
  }];

  @observable boardList;

  @observable boardPostList = {
    '/free': [],
    '/trade': [],
    '/notice': [],
    '/cash': [],
    '/qna': [],
    '/crime': [],
  };

  @observable currentBoard;

  constructor(root) {
    this.root = root;
  }

  @action setCurrentBoard = (currentBoard) => {
    this.currentBoard = currentBoard;
  };

  @action addPost = () => {
    if (!this.postValidationCheck()) {
      return false;
    }

    axios.post('/api/board/post', {
      board: this.post.board,
      category: this.post.category,
      title: this.post.title,
      writer: this.root.UserStore.userData.id,
      content: this.post.text,
      depth: 1,
      secret: this.post.secret,
      replyAllow: this.post.replyAllow,
      secretReplyAllow: this.post.secretReplyAllow,
    })
      .then((response) => {
        if (response.data) {
          this.root.RouteStore.history.push('/free');
          this.root.UtilStore.toggleAlert('글이 정상적으로 등록되었습니다.');
          this.post = {
            board: '',
            category: '',
            title: '',
            text: '',
            depth: '',
            secret: 'N',
            replyAllow: 'N',
            secretReplyAllow: 'N',
          };
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  @action addReply = () => {
    if (!this.replyValidationCheck()) {
      return false;
    }

    axios.post('/api/board/reply', {
      text: this.reply.text,
      writer: this.root.UserStore.userData.id,
      bpId: this.reply.bpId,
    })
      .then((response) => {
        if (response.data) {
          this.root.UtilStore.toggleAlert('댓글이 정상적으로 등록되었습니다.');
          this.reply = {
            text: '',
          };
        }
      })
      .catch((response) => { console.log(response); });

    return true;
  };

  replyValidationCheck = () => {
    if (!this.reply.text.trim()) {
      this.root.UtilStore.toggleAlert('댓글 내용을 입력해주세요.');
      return false;
    }

    return true;
  };

  @action onChangeValue = (event) => {
    console.log(event);
    if (typeof event === 'string') {
      this.post = {
        ...this.post,
        text: event,
      };
    } else if (this.post[event.target.name] === 'Y') {
      this.post = {
        ...this.post,
        [event.target.name]: 'N',
      };
    } else {
      this.post = {
        ...this.post,
        [event.target.name]: event.target.value,
      };
    }
  };

  @action onChangeReplyValue = (text) => {
    this.reply = {
      ...this.reply,
      text,
    };
  };

  @action setPostBoard = (board) => {
    this.post.board = board.toUpperCase();
  };

  @action setReplyBpId = (bpId) => {
    this.reply.bpId = bpId;
  };

  @action setPostBoardOptions = () => {
    this.boardList = this.boards.map((data) => (
      <option
        value={data.value}
        key={data.value}
      >
        {data.name}
      </option>
    ));
  };

  @action getBoardPostList = (board) => {
    axios.get('/api/board/post', { params: { board } })
      .then((response) => {
        if (response.data) {
          this.boardPostList = {
            ...this.boardPostList,
            [board]: response.data,
          };
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getPost = (id) => {
    axios.get(`/api/board/post/${id}`, {})
      .then((response) => {
        if (response.data) {
          const [post] = response.data;
          this.postView = post;
        }
      })
      .catch((response) => { console.log(response); });
  };

  postValidationCheck = () => {
    // board
    if (!this.post.board) {
      this.root.UtilStore.toggleAlert('게시판을 선택해주세요.');
      return false;
    }

    // category
    if (!this.post.category) {
      this.root.UtilStore.toggleAlert('카테고리를 선택해주세요.');
      return false;
    }

    // title
    if (!this.post.title.trim()) {
      this.root.UtilStore.toggleAlert('제목을 입력해주세요.');
      return false;
    }

    // text
    if (!this.post.text.trim()) {
      this.root.UtilStore.toggleAlert('내용을 입력해주세요.');
      return false;
    }

    return true;
  };
}

export default BoardStore;
