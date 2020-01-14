import { action, observable } from 'mobx';

class HeaderStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    smile: false,
    mail: false,
    avatar: false,
    login: false,
  };


  constructor(root) {
    this.root = root;
  }

  @action onActive = (target) => {
    const keys = Object.keys(this.dropdown);

    for (let i = 0; i < keys.length; i += 1) {
      this.dropdown = {
        ...this.dropdown,
        [keys[i]]: false,
      };
    }

    let name;
    if (typeof target.currentTarget.getAttribute === 'function') {
      name = target.currentTarget.getAttribute('name');
    }
    if (name !== undefined) {
      this.dropdown = {
        ...this.dropdown,
        [name]: !this.dropdown[name],
      };
    }
  };
}

export default HeaderStore;
