import { observable, action } from 'mobx';
import axios from 'axios';

class ReplyStore {
  @observable replyList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataReply = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/postlocker/reply', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.replyList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });
}

export default ReplyStore;
