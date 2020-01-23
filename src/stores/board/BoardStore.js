import { action, observable } from 'mobx';
import React from 'react';
import axios from 'axios';

class BoardStore {
  boardKinds = {
    notice: '공지사항',
    free: '자유 게시판',
    trade: '아이템 거래',
    cash: '월드락 거래',
    crime: '신고게시판',
    qna: '질문 & 답변',
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

  @observable currentBoard = '';

  @observable boardList;

  constructor(root) {
    this.root = root;
  }

  @action setCurrentBoard = (currentBoard) => {
    this.currentBoard = currentBoard;
  };

  @action setBoardOptions = () => {
    this.boardList = this.boards.map((data) => (
      <option
        value={data.value}
        key={data.value}
      >
        {data.name}
      </option>
    ));
  };

  @action setCurrentBoardToId = (id) => {
    axios.get('/api/board', { params: { id } })
      .then((response) => {
        if (response.data) {
          this.currentBoard = response.data;
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action getBoardName = (path) => this.boardKinds[path];

  @action moveBoard = (path) => {
    this.root.UtilRouteStore.history.setCurrentBoardToId('/'.concat(path.toLowerCase()));
  };
}

export default BoardStore;
