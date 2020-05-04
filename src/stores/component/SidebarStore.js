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

  // 기존 드롭다운 기본 toggle 이벤트를 사용하지 않고, 토글버튼에 onClick 이벤트로 체크했다.
  @action onActive = (event) => {
    const currentName = event.currentTarget.getAttribute('name');
    const keyList = Object.keys(this.dropdown);
    let key;

    // 똑같은 드롭다운을 다시 클릭하였을때
    if (this.currentDropdown === currentName) {
      this.dropdown[currentName] = false;
      this.currentDropdown = '';
      return;
    }
    this.dropdownClear();

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (key === currentName) {
        this.dropdown[key] = true;
        this.currentDropdown = key;
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
