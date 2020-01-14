import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading = true;

  constructor(root) {
    this.root = root;
  }

  @action setLoading = (v) => {
    this.loading = v;
  };
}

export default LoadingStore;
