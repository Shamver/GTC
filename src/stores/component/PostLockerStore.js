import { observable, action } from 'mobx';

class PostLockerStore {
  @observable activeTab = 'myPost';

  constructor(root) {
    this.root = root;
  }

  @action onActive = ((e) => {
    const { name } = e.target;

    if (this.activeTab !== name) {
      this.activeTab = name;
    }
  });
}

export default PostLockerStore;
