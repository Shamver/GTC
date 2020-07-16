import { observable, action } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class FavoriteStore {
  @observable favoriteList = [];

  @observable myFavoriteList = [];

  @observable favoriteMaxPage = 0;

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
        toast.error(response.message);
      });
  };

  @action getMyFavorite = async (currentPage) => {
    const { userData } = this.root.UserStore;

    await axios.get('/api/user/favorite/mine', {
      params: {
        userId: userData.id,
        currentPage,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          if (data.code === 1) {
            this.myFavoriteList = data.result;
            if (data.result.length === 0) {
              this.favoriteMaxPage = 0;
            } else {
              const { pageCount } = data.result[0];
              this.favoriteMaxPage = pageCount;
            }
          } else {
            toast.info(data.message);
          }
        } else {
          this.favoriteList = [];
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response.message);
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
            getPost(id).then();
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
          this.getFavorite().then();
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
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
              getPost(id).then();
            }
            this.getFavorite().then();
            toast.success(data.message);
          } else {
            toast.info(data.message);
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => { toast.error(response.message); });
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
