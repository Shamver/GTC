import { observable, action } from 'mobx';
import axios from 'axios';

class FavoriteStore {
  @observable favoriteList = [];

  constructor(root) {
    this.root = root;
  }

  @action getDataFavorite = (() => {
    const { userData } = this.root.UserStore;
    if (userData !== undefined) {
      axios.get('/api/user/favorite', {
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

  @action onDeleteFavorite = ((e) => {
    const { name } = e.target;

    axios.delete('/api/user/favorite', {
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

export default FavoriteStore;
