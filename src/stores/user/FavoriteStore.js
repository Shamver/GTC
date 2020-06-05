import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class FavoriteStore {
  @observable favoriteList = [];

  constructor(root) {
    this.root = root;
  }

  @action getFavorite = async () => {
    const { userData } = this.root.UserStore;

    await axios.get('/api/user/favorite', {
      params: {
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.favoriteList = data.result;
          } else {
            toast.info(data.message);
          }
        } else {
          this.favoriteList = [];
          toast.error(data.message);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  @action addFavorite = ((id) => {
    const { userData } = this.root.UserStore;
    const { getPost } = this.root.BoardPostStore;

    axios.post('/api/user/favorite', {
      bpId: id,
      userId: userData.id,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            getPost(id);
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
          this.getFavorite();
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  });

  @action deleteFavorite = ((id, type = 'post', e = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    const { userData } = this.root.UserStore;
    const { getPost } = this.root.BoardPostStore;

    axios.delete('/api/user/favorite', {
      data: {
        bpId: id,
        userId: userData.id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            if (type === 'post') {
              getPost(id);
            }
            this.getFavorite();
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { console.log(response); });
  });

  @action judgeFavorite = (isFavorite, id) => {
    if (isFavorite) {
      this.deleteFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }
}

export default FavoriteStore;
