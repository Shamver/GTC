import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class IgnoreStore {
  @observable ignoreList = [];

  constructor(root) {
    this.root = root;
  }

  @action getIgnore = async () => {
    const { userData } = this.root.UserStore;

    await axios.get('/api/user/ignore', {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.ignoreList = data.result;
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
  };

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
        if (data.success) {
          if (data.code === 1) {
            toast.success(data.message);
            this.getIgnore().then();
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => toast.error(response.message));
  };

  @action deleteIgnore = (() => {
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
          if (data.success) {
            if (data.code === 1) {
              toast.success(data.message);
              this.getIgnore().then();
            } else {
              toast.info(data.message);
            }
          } else {
            toast.error(data.message);
          }
        })
        .catch((response) => { toast.error(response.message); });
    } else {
      setTimeout(() => { // 딜레이를 안 주면 텍스트 할당이 안됨.. 대안 찾기.
        toast.error('아무것도 선택되지 않았습니다.');
      }, 100);
    }
  });
}

export default IgnoreStore;
