import { observable, action } from 'mobx';

class UtilStore {
  @observable alertToggle = false;

  @observable signToggle = false;

  @observable signDisplay = true;

  @observable text = '';

  constructor(root) {
    this.root = root;
  }

  @action toggleAlert = (text) => {
    if (text && typeof text === 'string') this.text = text;
    this.alertToggle = !this.alertToggle;
  };

  @action toggleSign = (result) => {
    if (result && result.profile) {
      this.root.UserStore.setRegisterData(result);
    }

    this.signToggle = !this.signToggle;
  };

  @action changeSign = () => {
    this.signDisplay = !this.signDisplay;
  };

  @action loginCheck = () => {
    const { userData } = this.root.UserStore;
    const { toggleAlert } = this.root.UtilStore;
    const { history } = this.root.UtilRouteStore;

    if (userData) {
      return true;
    }

    toggleAlert('로그인 후 이용 가능합니다.');
    history.push('/');
    return false;
  }
}

export default UtilStore;
