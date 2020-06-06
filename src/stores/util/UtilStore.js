import { observable, action } from 'mobx';
import { toast } from 'react-toastify';

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  constructor(root) {
    this.root = root;
  }

  @action toggleSign = (result) => {
    if (result && result.profile) {
      this.root.UserStore.setRegisterData(result);
    }

    this.signToggle = !this.signToggle;
  };

  @action changeSign = () => {
    this.signDisplay = !this.signDisplay;
  };

  @action loginCheck = async () => {
    const { userData } = this.root.UserStore;
    if (userData) {
      return true;
    }

    toast.error('로그인 후 이용 가능합니다.');
    return false;
  };

  @action onSetSidebarOpen = (open) => {
    this.sidebarOpen = open;
  }
}

export default UtilStore;
