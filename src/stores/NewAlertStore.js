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
            this.alertList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });

  @action onLink = ((e) => {
    axios.put('/api/user/alert', {
      id: [e.currentTarget.name],
    })
      .then(() => {

      })
      .catch((response) => { console.log(response); });
  });

  @action onDeleteAlert = ((e) => {
    axios.delete('/api/user/alert', {
      data: {
        id: e.currentTarget.name,
      },
    })
      .then(() => {
        this.getDataAlert();
      })
      .catch((response) => { console.log(response); });
  });

  @action onReadAlertAll = (() => {
    axios.put('/api/user/alert', {
      id: this.alertList.map((v) => v.id),
    })
      .then(() => {
        this.getDataAlert();
      })
      .catch((response) => { console.log(response); });
  });
}

export default NewAlertStore;
