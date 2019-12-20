import { observable, action } from 'mobx';
import axios from 'axios';

class SettingStore {
  @observable activeTab = 'ignore';

  @observable ignoreList = [];

  @observable favoriteList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataIgnore = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userSessionData } = this.root.UserStore;
    const { history } = this.root.RouteStore;
    if (userSessionData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/setting/ignore', {
        params: {
          user_id: userSessionData.id,
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

  @action getDataFavorite = (() => {
    const { userSessionData } = this.root.UserStore;
    if (userSessionData !== undefined) {
      axios.get('/api/setting/favorite', {
        params: {
          user_id: userSessionData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.favoriteList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });


  @action onActive = ((e) => {
    const { name } = e.target;

    if (this.activeTab !== name) {
      this.activeTab = name;
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

  @action onChangeFavorite = ((e) => {
    const { name } = e.target;

    this.favoriteList = this.favoriteList.map(
      (data) => (data.id === Number.parseInt(name, 10)
        ? { ...data, checked: !data.checked }
        : data),
    );
  });

  @action onDeleteIgnore = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const list = this.ignoreList.filter((item) => item.checked === true).map((v) => (v.id));

    if (list.length !== 0) {
      axios.delete('/api/setting/ignore', {
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

  @action onDeleteFavorite = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const list = this.favoriteList.filter((item) => item.checked === true).map((v) => (v.id));

    if (list.length !== 0) {
      axios.delete('/api/setting/favorite', {
        data: {
          list,
        },
      })
        .then(() => {
          this.getDataFavorite();
        })
        .catch((response) => { console.log(response); });
    } else {
      setTimeout(() => { // 딜레이를 안 주면 텍스트 할당이 안됨.. 대안 찾기.
        toggleAlert('아무것도 선택되지 않았습니다.');
      }, 100);
    }
  });
}

export default SettingStore;
