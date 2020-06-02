import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class IgnoreStore {
  @observable ignoreList = [];

  constructor(root) {
    this.root = root;
  }

  @action getIgnore = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/ignore', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.ignoreList = data.DATA;
            } else {
              toast.info(data.MESSAGE);
            }
          } else {
            toast.error(data.MESSAGE);
          }
        })
        .catch((response) => {
          toast.error(response.message);
        });
    } else {
      this.ignoreList = [];
    }
  });

  @action onChangeIgnore = ((e) => {
    const { name } = e.target;

    this.ignoreList = this.ignoreList.map(
      (data) => (data.id === Number.parseInt(name, 10)
        ? { ...data, checked: !data.checked }
        : data),
    );
  });

  @action addIgnore = (id) => {
    const { userData } = this.root.UserStore;
    axios.post('/api/user/ignore', {
      fromId: userData.id,
      targetId: id,
    })
      .then((response) => {
        const { data } = response;
        if (data.SUCCESS) {
          if (data.CODE === 1) {
            toast.success(data.MESSAGE);
            this.getIgnore();
          } else {
            toast.info(data.MESSAGE);
          }
        } else {
          toast.error(data.MESSAGE);
        }
      })
      .catch((response) => toast.error(response.message));
  };

  @action deleteIgnore = (() => {
    const { toggleAlert } = this.root.UtilAlertStore;
    const list = this.ignoreList.filter((item) => item.checked === true).map((v) => ({
      f_id: v.f_id,
      t_id: v.t_id,
    }));

    if (list.length !== 0) {
      axios.delete('/api/user/ignore', {
        data: {
          list,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data.SUCCESS) {
            if (data.CODE === 1) {
              toast.success(data.MESSAGE);
              this.getIgnore();
            } else {
              toast.info(data.MESSAGE);
            }
          } else {
            toast.error(data.MESSAGE);
          }
        })
        .catch((response) => { toast.error(response.message); });
    } else {
      setTimeout(() => { // 딜레이를 안 주면 텍스트 할당이 안됨.. 대안 찾기.
        toggleAlert('아무것도 선택되지 않았습니다.');
      }, 100);
    }
  });
}

export default IgnoreStore;
