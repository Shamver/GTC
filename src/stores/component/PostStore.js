import { observable, action } from 'mobx';

class PostStore {
  @observable dropdown = {
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

  @action onSet = (id) => {
    this.dropdown = {
      ...this.dropdown,
      [id]: false,
    };
  }
}

export default PostStore;
