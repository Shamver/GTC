import { observable, action } from 'mobx';

class SidebarStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    avatar: false,
    mail: false,
  };

  constructor(root) {
    this.root = root;
  }

  // 드롭다운을 열때와 드롭다운이 열린뒤에는 어디를 클릭해도 해당 이벤트가 발생한다.
  @action onActive = (event) => {
    console.log(event.target);
    const currentName = event.target.getAttribute('name');

    if (this.dropdownActiveCheck()) {
      this.dropdown = {
        ...this.dropdown,
        [currentName]: true,
      };
    } else {
      this.dropdownClear();
    }
  };

  // 다른 dropdown 이 켜져있을때 다른 드롭다운 클릭시
  // onActive 메소드가 두번 호출되는 현상이 발견됨.
  // 해결방법 : onActive 메소드 처음 호출시 모든 드롭다운이 닫혀있을시에만 클릭한 드롭다운을 열게함.
  @action dropdownActiveCheck = () => {
    const keyList = Object.keys(this.dropdown);
    let key;

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (this.dropdown[key]) {
        return false;
      }
    }
    return true;
  }

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
