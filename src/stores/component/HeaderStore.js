import { action, observable } from 'mobx';

class HeaderStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    mail: false,
    avatar: false,
    login: false,
  };

  @observable showIndex = 0;

  // 0: 공지사항, 1: 광고
  @observable showMode = 0;

  @observable searchOpen = false;

  constructor(root) {
    this.root = root;
  }

  @action openSearch = () => {
    this.searchOpen = !this.searchOpen;
  };

  @action onActive = (dropdown) => {
    if (this.dropdown[dropdown]) {
      this.dropdown[dropdown] = false;
      return;
    }

    const keyList = Object.keys(this.dropdown);
    let key;
    this.dropdownClear();

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (key === dropdown) {
        this.dropdown[dropdown] = true;
      }
    }
  };

  @action doCycleAds = () => setInterval(() => {
    // 5초마다 싸이클로 돌리기
    const { AdvertisePostListNow } = this.root.EventAdvertiseStore;
    if (AdvertisePostListNow.length !== 0) {
      if (this.showIndex < AdvertisePostListNow.length) {
        this.showMode = 1;
        this.showingHeader = AdvertisePostListNow[this.showIndex];
        this.showIndex += 1;
      } else {
        this.showIndex = 0;
        this.showMode = 0;
      }
    } else {
      if (this.showingHeader !== null) {
        this.showingHeader = null;
      }
      return false;
    }
  }, 5000);

  @action dropdownClear = () => {
    this.dropdown = {
      lately: false,
      favorite: false,
      play: false,
      mail: false,
      avatar: false,
      login: false,
    };
  }
}

export default HeaderStore;
