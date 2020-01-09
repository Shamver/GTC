import { observable, action } from 'mobx';
import axios from 'axios';

class UserAlertStore {
  @observable alertList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataAlert = ((updateYN = 'N') => {
    const { toggleAlert, setLoading } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/user/alert', {
        params: {
          updateYN,
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.alertList = response.data;
            setLoading(false);
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
        this.getDataAlert('Y');
      })
      .catch((response) => { console.log(response); });
  });

  @action onReadAlertAll = (() => {
    axios.put('/api/user/alert', {
      id: this.alertList.map((v) => v.id),
    })
      .then(() => {
        this.getDataAlert('Y');
      })
      .catch((response) => { console.log(response); });
  });
}

export default UserAlertStore;
