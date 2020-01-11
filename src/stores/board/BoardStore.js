import { action, observable } from 'mobx';
import axios from 'axios';
import React from 'react';

class BoardStore {
  boardKinds = {
    '/notice': '공지사항',
    '/free': '자유 게시판',
    '/trade': '아이템 거래',
    '/cash': '월드락 거래',
    '/crime': '신고게시판',
    '/qna': '질문 & 답변',
  };

  boards = [{
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



  @observable currentBoard;

  constructor(root) {
    this.root = root;
  }

  @action setCurrentBoard = (currentBoard) => {
    this.currentBoard = currentBoard;
  };

  @action onChangeValue = (event) => {
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

  @action setPostBoard = (board) => {
    this.post.board = board.toUpperCase();
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


}

export default BoardStore;
