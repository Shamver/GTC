import { observable, action } from 'mobx';

class MyAccountStore {
  @observable isProfile = true;

  constructor(root) {
    this.root = root;
  }

  @action onChangeProfile = (() => {
    this.isProfile = !this.isProfile;
  });
}

export default MyAccountStore;
