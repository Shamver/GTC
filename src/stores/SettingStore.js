import { observable, action } from 'mobx';
<<<<<<< HEAD
import axios from 'axios';
import UserStore from './UserStore';
import RouteStore from './RouteStore';
import UtilStore from './UtilStore';
=======
>>>>>>> origin/develop

class SettingStore {
  @observable activeTab = 'ignore';

  @observable ignoreList = [];

<<<<<<< HEAD
  @observable favoriteList = [];

  @action getDataIgnore = (() => {
    if (UserStore.userSessionData === undefined) {
      UtilStore.toggleAlert('로그인 후 이용해주세요.');
      RouteStore.history.push('/');
    } else {
      axios.get('/api/setting/ignore', {
        params: {
          user_id: UserStore.userSessionData.id,
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
=======
  constructor(root) {
    this.root = root;
  }

  @action getDataIgnore = () => {
    const tempData = [
      {
        id: 1,
        name: 'holy Bible',
        date: '20191234',
        checked: false,
      },
      {
        id: 2,
        name: 'SSSHIT',
        date: '20124823',
        checked: false,
      },
    ];

    this.ignoreList = tempData;
  };
>>>>>>> origin/develop

  @action getDataFavorite = (() => {
    if (UserStore.userSessionData !== undefined) {
      axios.get('/api/setting/favorite', {
        params: {
          user_id: UserStore.userSessionData.id,
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
<<<<<<< HEAD
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
        UtilStore.toggleAlert('아무것도 선택되지 않았습니다.');
      }, 100);
    }
  });

  @action onDeleteFavorite = (() => {
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
        UtilStore.toggleAlert('아무것도 선택되지 않았습니다.');
      }, 100);
    }
=======
    this.ignoreList = this.ignoreList.filter((item) => item.checked === false);
>>>>>>> origin/develop
  });
}

export default SettingStore;
