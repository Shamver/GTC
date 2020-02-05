import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class FavoriteStore {
  @observable favoriteList = [];

  constructor(root) {
    this.root = root;
  }

  @action getFavorite = (() => {
    const { userData } = this.root.UserStore;

    if (userData) {
      axios.get('/api/user/favorite', {
        params: {
          userId: userData.id,
        },
      })
        .then((response) => {
          const { data } = response;
          if (data) {
            this.favoriteList = response.data;
          } else if (data.message === 'not logged in') {
            this.favoriteList = [];
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.favoriteList = [];
    }
  });

  @action addFavorite = ((id) => {
    const { userData } = this.root.UserStore;
    const { getPost } = this.root.BoardPostStore;

    axios.post('/api/user/favorite', {
      bpId: id,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.POST_SUCCESS !== undefined && !response.data.POST_SUCCESS) {
          toast.error(response.data.MESSAGE);
        } else {
          getPost(id);
          toast.success('★ 즐겨찾기 추가됨');
        }
      })
      .catch((response) => { console.log(response); });
  });

  @action deleteFavorite = ((id, type = 'post') => {
    const { userData } = this.root.UserStore;
    const { getPost } = this.root.BoardPostStore;

    axios.delete('/api/user/favorite', {
      data: {
        bpId: id,
        userId: userData.id,
      },
    })
      .then(() => {
        if (type === 'post') {
          getPost(id);
        }
        this.getFavorite();
        toast.info('☆ 즐겨찾기 해제됨');
      })
      .catch((response) => { console.log(response); });
  });
}

export default FavoriteStore;
