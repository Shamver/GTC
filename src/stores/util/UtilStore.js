import { observable, action } from 'mobx';
import axios from 'axios';

class UtilStore {
  @observable signToggle = false;

  @observable signDisplay = true;

  @observable sidebarOpen = false;

  @observable profileToggle = false;

  @observable profileData = {
    profileInfo: {},
    profilePostData: [],
    profileCommentData: [],
    profileNicknameHistory: [],
  };

  @observable activeTab = '1';

  @observable pageIndex = {
    postIndex: 1,
    commentIndex: 1,
  };

  @observable rows = {
    postRows: 0,
    commentRows: 0,
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
      postIndex: 1,
      commentIndex: 1,
    };
  }

  @action toggleTab = (tab) => {
    this.activeTab = tab;
  }

  @action getProfile = (writerId) => {
    this.profileToggle = !this.profileToggle;
    const { pageIdx } = this.pageIndex;

    axios.get(`/api/user/profile/${writerId}`, { params: { writerId } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            console.log(data.DATA);
            this.profileData = {
              ...this.profileData,
              profileInfo: data.DATA,
            };
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/nickname`, { params: { writerId } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            console.log(data.DATA);
            this.profileData = {
              ...this.profileData,
              profileNicknameHistory: data.DATA,
            };
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/post/${pageIdx}`, { params: { writerId, index: 1 } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profilePostData: data.DATA,
            };
            this.rows = {
              ...this.rows,
              postRows: data.DATA[0].rowCount,
            };
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });

    axios.get(`/api/user/profile/${writerId}/comment/${pageIdx}`, { params: { writerId, index: 1 } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profileCommentData: data.DATA,
            };
            this.rows = {
              ...this.rows,
              commentRows: data.DATA[0].rowCount,
            };
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

  @action getPostList = (index) => {
    const writerId = this.profileData.profileInfo.userId;
    this.pageIndex = {
      ...this.pageIndex,
      postIndex: index,
    };
    const { postIndex } = this.pageIndex;

    axios.get(`/api/user/profile/${writerId}/post/${postIndex}`, { params: { index } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profilePostData: data.DATA,
            };
            this.rows = {
              ...this.rows,
              postRows: data.DATA[0].rowCount,
            };
          } else {
            console.log(data.MESSAGE);
          }
        } else {
          console.log(data.MESSAGE);
        }
      })
      .catch((response) => { console.log(response); });
  }

  @action getCommentList = (index) => {
    const writerId = this.profileData.profileInfo.userId;
    this.pageIndex = {
      ...this.pageIndex,
      commentIndex: index,
    };
    const { commentIndex } = this.pageIndex;

    axios.get(`/api/user/profile/${writerId}/comment/${commentIndex}`, { params: { index } })
      .then((response) => {
        const { data } = response;

        if (data.SUCCESS) {
          if (data.CODE === 1) {
            this.profileData = {
              ...this.profileData,
              profileCommentData: data.DATA,
            };
            this.rows = {
              ...this.rows,
              commentRows: data.DATA[0].rowCount,
            };
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
