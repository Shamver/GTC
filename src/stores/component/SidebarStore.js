import { observable, action } from 'mobx';

class SidebarStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    avatar: false,
  };

  @action onActive = (event) => {
    if (!event.target.classList.contains('dropdown-item')) {
      event.preventDefault();
    }

    const currentName = event.target.getAttribute('name');
    const keyList = Object.keys(this.dropdown);
    let key;

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (currentName === key) {
        this.dropdown = {
          ...this.dropdown,
          [key]: true,
        };
      } else {
        this.dropdown = {
          ...this.dropdown,
          [key]: false,
        };
      }
    }
  };
}

export default SidebarStore;
