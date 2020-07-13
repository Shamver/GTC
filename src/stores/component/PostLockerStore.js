import { action } from 'mobx';

class PostLockerStore {
  constructor(root) {
    this.root = root;
  }

  @action onActive = ((e) => {
    const { name } = e.target;
    const { history } = this.root.UtilRouteStore;

    history.push(`/postlocker/${name}`);
  });
}

export default PostLockerStore;
