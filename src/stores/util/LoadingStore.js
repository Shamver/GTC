import { observable, action } from 'mobx';

class LoadingStore {
  @observable loading = true;

  constructor(root) {
    this.root = root;
  }

  @action setLoading = (v) => {
    this.loading = v;
  };

  @action doLoading = () => {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }
}

export default LoadingStore;
