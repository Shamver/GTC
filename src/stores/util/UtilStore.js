import { observable, action } from 'mobx';
import axios from "axios";
import {toast} from "react-toastify";

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  @observable profileToggle = false;

  @observable profileData = {};

  @observable profilePostData = [];

  @observable profileCommentData = [];

  @observable activeTab = '1';

  @observable pageIndex = 1;

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
    this.pageIndex = 1;
  }

  @action getProfile = (writerId) => {
    this.profileToggle = !this.profileToggle;

    axios.get(`/api/user/profile/${writerId}`, { params : {writerId} })
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

    axios.get(`/api/user/profile/${writerId}/post/1`, { params : {writerId: writerId, currentPageNum: 1 } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profilePostData = data.DATA;
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/comment`, { params : {writerId} })
        .then((response) => {
          const { data } = response;

          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.profileCommentData = data.DATA;
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

  @action toggleTab = tab => {
    this.activeTab = tab;
  }

  @action getPostList = index => {
    this.pageIndex = index;
    let writerId = this.profileData.userId;
    let currentPageNum = ( ( 5 * index ) - 4 ) - 1;

    axios.get(`/api/user/profile/${writerId}/post/${index}`, { params : { currentPageNum: currentPageNum } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profilePostData = data.DATA;
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  }
}

export default UtilStore;
