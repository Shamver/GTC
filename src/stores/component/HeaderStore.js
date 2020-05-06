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

  @observable searchOpen = false;

  constructor(root) {
    this.root = root;
  }

  @action openSearch = () => {
    this.searchOpen = !this.searchOpen;
  }

  @action

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
