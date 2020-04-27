import { observable, action } from 'mobx';

class SidebarStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    mail: false,
    avatar: false,
    login: false,
  };

  @action onActive = (target) => {
    console.log(target);
  };
}

export default SidebarStore;
