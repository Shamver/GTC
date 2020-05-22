import { observable, action } from 'mobx';
import axios from "axios";
import {toast} from "react-toastify";

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  @observable profileToggle = false;

  @observable profileData = {
    profileInfo : {},
    profilePostData : [],
    profileCommentData : []
  };

  @observable activeTab = '1';

  @observable pageIndex = {
    postIndex : 1,
    commentIndex : 1
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

  @action toggleProfile = () => {
    this.profileToggle = !this.profileToggle;
    this.pageIndex = {
      postIndex : 1,
      commentIndex : 1
    };
  }

  @action toggleTab = tab => {
    this.activeTab = tab;
  }

  @action getProfile = (writerId) => {
    this.profileToggle = !this.profileToggle;
    let { pageIdx } = this.pageIndex;

    axios.get(`/api/user/profile/${writerId}`, { params : {writerId} })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.profileData = {
                  ...this.profileData,
                  profileInfo: data.DATA
              }
            } else {
              console.log(data.MESSAGE);
            }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/post/${pageIdx}`, { params : {writerId: writerId, currentPageNum: 0 } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profilePostData: data.DATA
            }
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/comment/${pageIdx}`, { params : {writerId: writerId, currentPageNum: 0 } })
        .then((response) => {
          const { data } = response;

          if (data.SUCCESS) {
            if (data.CODE === 1) {
              this.profileData = {
                ...this.profileData,
                profileCommentData: data.DATA
              }
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

  @action getPostList = index => {
    const writerId = this.profileData.profileInfo.userId;

    this.pageIndex = {
      ...this.pageIndex,
      postIndex : index,
    };

    let { postIndex } = this.pageIndex;
    let currentPageNum = ( ( 5 * index ) - 4 ) - 1;

    axios.get(`/api/user/profile/${writerId}/post/${postIndex}`, { params : { currentPageNum: currentPageNum } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profilePostData: data.DATA
            }
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  }

  @action getCommentList = index => {
    const writerId = this.profileData.profileInfo.userId;

    this.pageIndex = {
      ...this.pageIndex,
      commentIndex : index,
    };
    let { commentIndex } = this.pageIndex;
    let currentPageNum = ( ( 5 * index ) - 4 ) - 1;

    axios.get(`/api/user/profile/${writerId}/comment/${commentIndex}`, { params : { currentPageNum: currentPageNum } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profileCommentData: data.DATA
            }
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
