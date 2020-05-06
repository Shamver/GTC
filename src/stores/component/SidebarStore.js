import { observable, action } from 'mobx';

class SidebarStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    avatar: false,
    mail: false,
  };

  @observable currentDropdown = '';

  constructor(root) {
    this.root = root;
  }

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
      avatar: false,
      mail: false,
    };
  }
}

export default SidebarStore;
