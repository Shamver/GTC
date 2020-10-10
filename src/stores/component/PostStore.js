import { observable, action } from 'mobx';

class PostStore {
  @observable dropdown = {};

  @observable postOptionOpen = false;

  @observable profileDropdown = false;

  constructor(root) {
    this.root = root;
  }

  @action toggleProfileDropdown = () => {
    this.profileDropdown = !this.profileDropdown;
  }

  @action openPostOption = () => {
    this.postOptionOpen = !this.postOptionOpen;
  };

  @action onActive = (index) => {
    if (this.dropdown[index]) {
      this.dropdown[index] = false;
      return;
    }

    const keyList = Object.keys(this.dropdown);
    let key;
    this.dropdownClear();

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      if (key === index) {
        this.dropdown[index] = true;
      }
    }
  };

  @action onSet = (id) => {
    this.dropdown = {
      ...this.dropdown,
      [id]: false,
    };
  };

  @action dropdownClear = () => {
    const keyList = Object.keys(this.dropdown);
    let key;

    for (let i = 0; i < keyList.length; i += 1) {
      key = keyList[i];
      this.dropdown[key] = false;
    }
  };

  @action onClickPost = (id) => {
    const { history } = this.root.UtilRouteStore;
    const visited = localStorage.getItem('visited');
    const visitedArray = visited ? visited.split('|') : [];
    if (!visitedArray.includes(id.toString())) {
      const inputId = visited ? `${visited}|${id}` : id;
      localStorage.setItem('visited', inputId);
    }
    history.push(`/post/${id}`);
  };

  @action isVisited = (id) => {
    const visited = localStorage.getItem('visited');
    const visitedArray = visited ? visited.split('|') : [];
    return visitedArray.includes(id.toString());
  }

  @action goToPost = (postId, commentId) => {
    const { history } = this.root.UtilRouteStore;
    const { toggleProfile } = this.root.UtilStore;
    history.push(`/post/${postId}#${commentId || ''}`);
    toggleProfile();
  }
}

export default PostStore;
