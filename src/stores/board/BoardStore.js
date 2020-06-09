import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class BoardStore {
  @observable boardKinds = {
    notice: '공지사항',
    free: '자유 게시판',
    trade: '아이템 거래',
    cash: '월드락 거래',
    crime: '신고게시판',
    qna: '질문 & 답변',
    all: '전체 글 보기',
  };

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
    name: '신고 게시판',
  }, {
    value: 'Q&A',
    name: '질문 & 답변',
  }];

  @observable tempData = [];

  @observable currentBoard = '';

  @observable currentBoardPath = '';

  constructor(root) {
    this.root = root;
  }

  @action setCurrentBoard = (currentBoard) => {
    this.currentBoard = currentBoard;
    this.root.BoardPostStore.toggleBestPostToken = false;
  };

  @action setCurrentBoardToId = (id) => {
    axios.get('/api/board', { params: { id } })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.currentBoard = data.result;
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  };

  @action getBoardName = (path) => this.boardKinds[path];

  @action moveBoard = (path) => {
    this.root.UtilRouteStore.history.setCurrentBoardToId('/'.concat(path.toLowerCase()));
  };
}

export default BoardStore;
