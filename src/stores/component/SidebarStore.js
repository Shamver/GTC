import { observable, action } from 'mobx';

class SidebarStore {
  @observable dropdown = {
    lately: false,
    favorite: false,
    play: false,
    avatar: false,
    mail: false,
  };

  // 드롭다운을 열때와 드롭다운이 열린뒤에는 어디를 클릭해도 해당 이벤트가 발생한다.
  @action onActive = (event) => {
    if (!event.target.classList.contains('dropdown-item')) {
      event.preventDefault();
    }

    const currentName = event.target.getAttribute('name');
    const keyList = Object.keys(this.dropdown);
    let key;
    let result;

    alert(currentName);
    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      result = true;
      if (currentName === key) {
        if (this.dropdown[currentName]) {
          result = false;
        }
        this.dropdown = {
          ...this.dropdown,
          [key]: result,
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
