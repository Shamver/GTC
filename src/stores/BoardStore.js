import { action, observable } from 'mobx';
import axios from 'axios';
import React from 'react';

class BoardStore {
  @observable post = {
    board: '',
    title: '',
    text: '',
  };

  @observable boards = [{
    value: 'notice',
    name: '공지사항',
  }, {
    value: 'free',
    name: '자유 게시판',
  }, {
    value: 'trade',
    name: '아이템 거래',
  }, {
    value: 'cash',
    name: '월드락 거래',
  }, {
    value: 'crime',
    name: '신고게시판',
  }, {
    value: 'qna',
    name: '질문 & 답변',
  }];

  @observable boardList;

  constructor(root) {
    this.root = root;
  }

  @action addPost = () => {
    axios.post('/api/addPost', {
      board: 'FREE',
      category: 'ALL',
      title: this.post.title,
      writer: 'admin',
      content: this.post.text,
      depth: 1,
    })
      .then((response) => {
        if (response.data) {
          this.root.RouteStore.history.push('/free');
          this.root.UtilStore.toggleAlert('글이 정상적으로 등록되었습니다.');
          this.post = {
            title: '',
            text: '',
          };
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action onChangeValue = (event) => {
    if (typeof event === 'string') {
      this.post = {
        ...this.post,
        text: event,
      };
    } else {
      this.post = {
        ...this.post,
        [event.target.name]: event.target.value,
      };
    }
  };

  @action setPostBoard = (board) => {
    this.post.board = board;
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
    axios.post('/api/getPost', { board })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch((response) => { console.log(response); });
  }
}

export default BoardStore;
