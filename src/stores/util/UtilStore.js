import { observable, action } from 'mobx';
import { toast } from 'react-toastify';

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

  @observable userGenderCodeList = [];

  constructor(root) {
    this.root = root;
  }

  @action setUserGenderCodeList = (code) => {
    this.userGenderCodeList = code;
  }

  @action toggleSign = (result) => {
    if (result && result.profile) {
      this.root.UserStore.setRegisterData(result);
      this.root.SystemCodeStore.getCodeComponent('GENDER_CODE', this.setUserGenderCodeList);
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
