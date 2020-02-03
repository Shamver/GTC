import { observable, action } from 'mobx';
import axios from 'axios';

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
