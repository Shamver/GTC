import { observable, action } from 'mobx';
import axios from 'axios';

class PostLockerStore {
  @observable activeTab = 'myPost';

  @observable postList = [];

  @observable replyList = [];

  @observable favoriteList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataPost = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/postlocker/post', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.postList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });

  @action getDataReply = (() => {
    const { toggleAlert } = this.root.UtilStore;
    const { userData } = this.root.UserStore;
    const { history } = this.root.RouteStore;

    if (userData === undefined) {
      toggleAlert('로그인 후 이용해주세요.');
      history.push('/');
    } else {
      axios.get('/api/postlocker/reply', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.replyList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });

  @action getDataFavorite = (() => {
    const { userData } = this.root.UserStore;
    if (userData !== undefined) {
      axios.get('/api/postlocker/favorite', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.favoriteList = response.data;
          }
        })
        .catch((response) => { console.log(response); });
    }
  });


  @action onActive = ((e) => {
    const { name } = e.target;

    if (this.activeTab !== name) {
      this.activeTab = name;
    }
  });

  @action onChangeIgnore = ((e) => {
    const { name } = e.target;

    this.ignoreList = this.ignoreList.map(
      (data) => (data.id === Number.parseInt(name, 10)
        ? { ...data, checked: !data.checked }
        : data),
    );
  });

  @action onDeleteFavorite = ((e) => {
    const { name } = e.target;

    axios.delete('/api/postlocker/favorite', {
      data: {
        name,
      },
    })
      .then(() => {
        this.getDataFavorite();
      })
      .catch((response) => { console.log(response); });
  });
}

export default PostLockerStore;
