import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class AlertStore {
  @observable alertList = [];

  @observable alertCount = 0;

  constructor(root) {
    this.root = root;
  }

  @action getAlert = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/alert', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.code === 1) {
              this.alertList = data.result;
              if (data.result.length > 0) {
                this.alertCount = data.result.filter((v) => v.isRead === 0).length;
              }
            } else {
              toast.info(data.message);
            }
          } else {
            toast.error(data.message);
          }
        })
        .catch((response) => {
          toast.error(response.message);
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
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            // 읽기 성공
            this.getAlert();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  });

  @action onDeleteAlert = ((e) => {
    axios.delete('/api/user/alert', {
      data: {
        id: e.currentTarget.name,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.getAlert();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  });

  @action onReadAlertAll = (() => {
    if (this.alertList.length === 0) {
      return;
    }

    axios.put('/api/user/alert', {
      id: this.alertList.map((v) => v.id),
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.getAlert();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
  });
}

export default AlertStore;
