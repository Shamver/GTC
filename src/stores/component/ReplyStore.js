import { observable, action } from 'mobx';

class ReplyStore {
  @observable dropdown = {};

  constructor(root) {
    this.root = root;
  }

  @action onActive = (index) => {
    if (this.dropdown[index]) {
      this.dropdown[index] = false;
      return;
    }

    const keyList = Object.keys(this.dropdown);
    let key;
    this.dropdownClear();

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (key === index) {
        this.dropdown[index] = true;
      }
    }
  };

  @action dropdownClear = () => {
    const keyList = Object.keys(this.dropdown);
    let key;

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      this.dropdown[key] = false;
    }
  }

  @action onSet = (id) => {
    this.dropdown = {
      ...this.dropdown,
      [id]: false,
    };
  }
}

export default ReplyStore;
