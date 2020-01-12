import { observable, action } from 'mobx';
import axios from 'axios';

class PostStore {
  @observable postList = [];

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
      axios.get('/api/board/mine', {
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
}

export default PostStore;
