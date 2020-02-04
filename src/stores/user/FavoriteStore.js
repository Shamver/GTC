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
          if (data.success) {
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
        }
      })
      .catch((response) => { console.log(response); });
  });

  @action onDeleteFavorite = ((e) => {
    const { name } = e.target;

    axios.delete('/api/user/favorite', {
      data: {
        name,
      },
    })
      .then(() => {
        this.getFavorite();
      })
      .catch((response) => { console.log(response); });
  });
}

export default FavoriteStore;
