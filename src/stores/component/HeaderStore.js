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

  @observable showIndex = -1;

  // 0: 공지사항, 1: 광고
  @observable showMode = 0;

  @observable searchOpen = false;

  @observable showingHeader = {
    url: '',
    message: '',
  };

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

  @action doCycleHeader = () => setInterval(() => {
    // 5초마다 싸이클로 돌리기
    this.settingHeader();

    return false;
  }, 5000);

  @action settingHeader = (isFirst = false) => {
    const { headerNoticeList } = this.root.BoardPostStore;
    const { advertisePostListNow } = this.root.EventAdvertiseStore;

    const noticeLength = headerNoticeList.length;
    const adLength = advertisePostListNow.length;

    if (isFirst) return;

    if (this.showMode === 0 && this.showIndex === (noticeLength || 1) - 1) {
      this.showMode = 1;
      this.showIndex = 0;
    } else if (this.showMode === 1 && this.showIndex === (adLength || 1) - 1) {
      this.showMode = 0;
      this.showIndex = 0;
    } else {
      this.showIndex += 1;
    }

    if (this.showMode === 0) {
      if (noticeLength === 0) {
        this.showingHeader = {
          url: '/notice',
          message: '등록된 공지가 없습니다.',
        };
      } else {
        const { id, title } = headerNoticeList[this.showIndex];
        this.showingHeader = {
          url: `/post/${id}`,
          message: title,
        };
      }
    } else {
      if (adLength === 0) {
        this.showingHeader = {
          url: '/advertise',
          message: '등록된 광고가 없습니다. 광고를 등록해보세요!',
        };
      } else {
        this.showingHeader = advertisePostListNow[this.showIndex];
      }
    }
  }

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
