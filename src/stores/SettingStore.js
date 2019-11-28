import { observable, action } from 'mobx';
import UserStore from './UserStore';
// import axios from 'axios';
// import RouteStore from "./RouteStore";
// import UtilStore from "./UtilStore";

class SettingStore {
  @observable activeTab = 'ignore';

  @observable ignoreList = [];

  @action getDataIgnore = (() => {
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

    console.log(UserStore.userSessionData);

    this.ignoreList = tempData;
  });

  // @action getDateIgnore = () => {
  //   axios.post('/api/setting/getIgnore', {
  //     user_id: 1,
  //   })
  //     .then((response) => {
  //       if (response.data) {
  //         RouteStore.history.push('/free');
  //         UtilStore.toggleAlert('글이 정상적으로 등록되었습니다.');
  //         this.post = {
  //           title: '',
  //           text: '',
  //         };
  //       }
  //     })
  //     .catch((response) => { console.log(response); });
  // };


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

  @action onDeleteIgnore = (() => {
    this.ignoreList = this.ignoreList.filter((item) => item.checked === false);


  });
}

export default new SettingStore();
