import { observable, action } from 'mobx';
import axios from 'axios';

class ReplyStore {
  @observable replyMineList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataReplyMine = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/reply/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.replyMineList = response.data;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.replyMineList = [];
    }
  });
}

export default ReplyStore;
