import { observable, action } from 'mobx';
import axios from 'axios';

class NewAlertStore {
  @observable alertList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataAlert = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/user/alert', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            // this.alertList = response.data;
            this.alertList = [
              {
                id: 1,
                replyName: '인욱쿤1',
                postId: 1,
                postTitle: '인벤 앞 한 장 정리 짤',
                replyId: 1,
                replyContent: '표정 곱창났네 ㅋㅋ',
                replyDate: '2달 전',
                type: 'reply',
                readed: false,
              },
              {
                id: 0,
                replyName: '인욱쿤2',
                postId: 2,
                postTitle: '인벤 앞 한 장 정리 짤',
                replyId: 1,
                replyContent: '표정 곱창났네 ㅋㅋ',
                replyDate: '2달 전',
                type: 'rereply',
                readed: true,
              },
            ];
          }
        })
        .catch((response) => { console.log(response); });
    }
  });

  @action onDeleteAlert = ((e) => {
    console.log(e.currentTarget);
    axios.delete('/api/user/alert', {
      data: {
        type: 'one',
        id: e.currentTarget.name,
      },
    })
      .then(() => {
        this.getDataAlert();
      })
      .catch((response) => { console.log(response); });
  });

  @action onDeleteAlertAll = (() => {
    axios.delete('/api/user/alert', {
      data: {
        type: 'all',
      },
    })
      .then(() => {
        this.getDataAlert();
      })
      .catch((response) => { console.log(response); });
  });
}

export default NewAlertStore;
