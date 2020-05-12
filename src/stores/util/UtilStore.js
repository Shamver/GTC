import { observable, action } from 'mobx';
import axios from "axios";
import {toast} from "react-toastify";

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  @observable profileToggle = false;

  @observable profileData = {

  };

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

  @action getProfile = (writerId) => {
    this.profileToggle = !this.profileToggle;

    axios.post('/api/user/profile', { userId : writerId })
        .then((response) => {
          const { data } = response;

          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.profileData = data.DATA;
            } else {
              console.log(data.MESSAGE);
            }
          } else {
            console.log(data.MESSAGE);
          }
        })
        .catch((response) => { console.log(response); });

    return true;
  }
}

export default UtilStore;
