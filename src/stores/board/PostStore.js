import { observable, action } from 'mobx';
import axios from 'axios';

class PostStore {
  @observable postMineList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataPostMine = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/board/post/mine', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          if (response.data) {
            this.postMineList = response.data;
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.postMineList = [];
    }
  });
}

export default PostStore;
