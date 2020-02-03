import { observable, action } from 'mobx';
import axios from 'axios';

class AlertStore {
  @observable alertList = [];

  @observable alertCount = 0;

  constructor(root) {
    this.root = root;
  }

  @action getAlert = ((updateYN = 'N') => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/alert', {
        params: {
          updateYN,
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.alertList = response.data;
            if (response.data.length > 0) {
              this.alertCount = response.data.filter((v) => v.isRead === 'N').length;
            }
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.alertList = [];
      this.alertCount = 0;
    }
  });

  @action onClickAlert = ((e) => {
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
        this.getAlert('Y');
      })
      .catch((response) => { console.log(response); });
  });

  @action onReadAlertAll = (() => {
    if (this.alertList.length === 0) {
      return;
    }

    axios.put('/api/user/alert', {
      id: this.alertList.map((v) => v.id),
    })
      .then(() => {
        this.getAlert('Y');
      })
      .catch((response) => { console.log(response); });
  });
}

export default AlertStore;
