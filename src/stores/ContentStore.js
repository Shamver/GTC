import { action, observable } from 'mobx';
import axios from 'axios';
import React from 'react';
import UtilStore from './UtilStore';
import RouteStore from './RouteStore';

class ContentStore {
  @observable post = {
    board: '',
    title: '',
    text: '',
  };

  @observable options = [{
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

  @observable optionList;

  @action addPost = () => {
    axios.post('api/addPost', {
      board: 'FREE',
      category: 'ALL',
      title: this.post.title,
      writer: 'admin',
      content: this.post.text,
      depth: 1,
    })
      .then((response) => {
        if (response.data) {
          RouteStore.history.push('/free');
          UtilStore.toggleAlert('글이 정상적으로 등록되었습니다.');
          this.post = {
            title: '',
            text: '',
          };
        }
      })
      .catch((response) => { console.log(response); });
  };

  @action onChangeValue = (event) => {
    console.log(event);
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
    this.optionList = this.options.map((data) => (
      <option
        value={data.value}
        key={data.value}
      >
        {data.name}
      </option>
    ));
  };
}

export default new ContentStore();
