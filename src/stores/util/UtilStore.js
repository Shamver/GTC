import { observable, action } from 'mobx';

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  @observable profileToggle = false;

  @observable activeTab = '1';

  @observable pageIndex = {
    postIndex: 1,
    commentIndex: 1,
    nickNameIndex: 1,
  };

  @observable rows = {
    postRows: 0,
    commentRows: 0,
    nickNameRows: 0,
  };

  @observable tosToggle = false;

  @observable privacyToggle = false;

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

  @action loginCheck = () => {
    const { userData } = this.root.UserStore;
    const { toggleAlert } = this.root.UtilAlertStore;
    const { history } = this.root.UtilRouteStore;

    if (userData) {
      return true;
    }

    toggleAlert('로그인 후 이용 가능합니다.');
    history.push('/');
    return false;
  }

  @action onSetSidebarOpen = (open) => {
    this.sidebarOpen = open;
  }

  @action toggleProfile = () => {
    this.profileToggle = !this.profileToggle;
    this.pageIndex = {
      postIndex: 1,
      commentIndex: 1,
      nickNameIndex: 1,
    };
    this.rows = {
      postRows: 0,
      commentRows: 0,
      nickNameRows: 0,
    };
  }

  @action toggleTab = (tab) => {
    this.activeTab = tab;
  }

  @action toggleTos = () => {
    this.tosToggle = !this.tosToggle;
  }

  @action togglePrivacy = () => {
    this.privacyToggle = !this.privacyToggle;
  }
}

export default UtilStore;
