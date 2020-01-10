import { observable, action } from 'mobx';
import axios from 'axios';

class IgnoreStore {
  @observable ignoreList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataIgnore = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/user/ignore', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.ignoreList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
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

  @action onDeleteIgnore = (() => {
    const { toggleAlert } = this.root.UtilStore;
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
        .then(() => {
          this.getDataIgnore();
        })
        .catch((response) => { console.log(response); });
    } else {
      setTimeout(() => { // 딜레이를 안 주면 텍스트 할당이 안됨.. 대안 찾기.
        toggleAlert('아무것도 선택되지 않았습니다.');
      }, 100);
    }
  });
}

export default IgnoreStore;
